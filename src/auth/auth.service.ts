import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async loginUser(data: LoginDto): Promise<any> {
        let is_correct = await this.usersService.login(data);
        if (is_correct.email) {
            const payload = {
                id: is_correct.id,
                firstName: is_correct.firstName,
                lastName: is_correct.lastName,
                email: is_correct.email,
                role: is_correct.role,
                avatar: is_correct.profile_path
            };

            return {
                user: payload,
                access_token: this.jwtService.sign(payload),
            };
        }
    }
    async registerUser(data: CreateUserDto): Promise<any> {
        let isCreated = await this.usersService.create(data)
        if (isCreated.firstName) {
            const payload = {
                id: isCreated.id,
                firstName: isCreated.firstName,
                lastName: isCreated.lastName,
                email: isCreated.email,
                role: isCreated.role,
                avatar: isCreated.profile_path
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
