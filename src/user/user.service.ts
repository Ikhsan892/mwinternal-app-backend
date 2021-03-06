import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    let result = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (!result) {
      // Hashing Password
      const saltOrRounds = 10;
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      // Save to DB
      let hasil = await this.usersRepository.save(createUserDto);
      let find_result = await this.usersRepository.findOne({
        where: {
          id: hasil.id,
        },
        relations: ['role', 'role.menu'],
      });
      return find_result;
    } else {
      return {
        status: 403,
        message: 'Email already registered',
      };
    }
  }

  async login(user: LoginDto): Promise<any> {
    let email_correct = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
      relations: ['role', 'role.menu'],
    });

    if (!email_correct) {
      throw new HttpException(
        {
          status: 223,
          message: "Email's Wrong",
        },
        223,
      );
    } else {
      let compare_pw = await bcrypt.compare(
        user.password,
        email_correct.password,
      );
      if (compare_pw) {
        return email_correct;
      } else {
        throw new HttpException(
          {
            status: 223,
            message: "Password's Wrong",
          },
          223,
        );
      }
    }
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByRefresh(refreshToken: string) {
    const user = await this.usersRepository.findOne({
      where: {
        refresh_token: refreshToken,
      },
      relations: ['role', 'role.menu'],
    });

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this refresh token not exists',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string) {
    return this.getByRefresh(refreshToken);
  }

  async findAll(): Promise<any> {
    return await this.usersRepository.find({
      relations: ['role'],
    });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    await this.usersRepository.update(userId, {
      refresh_token: refreshToken,
    });
  }

  async findOne(id: number): Promise<any> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.usersRepository.update({ id }, updateUserDto);
  }

  async remove(id: number): Promise<any> {
    return await this.usersRepository.softDelete(id);
  }

  db(): Repository<User> {
    return this.usersRepository;
  }
}
