import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async redux(array, keys_to_keep: string[]): Promise<any[]> {
    return array.map((o) =>
      keys_to_keep.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
      }, {}),
    );
  }

  public getCookieWithJwtRefreshToken() {
    return uuidv4();
  }

  public getJWTToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  public async getRefreshTokenJWT(refreshToken: any) {
    let data = await this.usersService.getUserIfRefreshTokenMatches(
      refreshToken,
    );
    let new_refresh_token = this.getCookieWithJwtRefreshToken();
    await this.usersService.setCurrentRefreshToken(new_refresh_token, data.id);

    const payload = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role.nama_role,
      avatar: data.profile_path,
      menu: await this.redux(data.role.menu, ['link']),
    };
    return {
      ...payload,
      access_token: this.getJWTToken(payload),
      refresh_token: new_refresh_token,
    };
  }

  async loginUser(data: LoginDto): Promise<any> {
    let is_correct = await this.usersService.login(data);
    if (is_correct.email) {
      const payload = {
        id: is_correct.id,
        firstName: is_correct.firstName,
        lastName: is_correct.lastName,
        email: is_correct.email,
        role: is_correct.role.nama_role,
        avatar: is_correct.profile_path,
        menu: await this.redux(is_correct.role.menu, ['link']),
      };

      let refresh_token = await this.getCookieWithJwtRefreshToken();
      await this.usersService.setCurrentRefreshToken(
        refresh_token,
        is_correct.id,
      );
      return {
        user: payload,
        access_token: this.getJWTToken(payload),
        refresh_token: refresh_token,
      };
    }
  }
  async registerUser(data: CreateUserDto): Promise<any> {
    let isCreated = await this.usersService.create(data);
    if (isCreated.firstName) {
      const payload = {
        id: isCreated.id,
        firstName: isCreated.firstName,
        lastName: isCreated.lastName,
        email: isCreated.email,
        role: isCreated.role.nama_role,
        avatar: isCreated.profile_path,
        menu: await this.redux(isCreated.role.menu, ['link']),
      };

      return {
        user: payload,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return new ForbiddenException();
    }
  }
}
