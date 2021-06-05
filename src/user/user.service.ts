import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    let result = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (!result) {
      // Hashing Password
      const saltOrRounds = 10;
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
      // Save to DB
      let hasil = await this.usersRepository.save(createUserDto);
      let find_result = await this.usersRepository.findOne({
        where: {
          id: hasil.id
        },
        relations: ['role']
      })
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
      relations: ['role'],
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
