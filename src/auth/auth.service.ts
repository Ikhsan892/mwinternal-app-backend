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

    async redux(array, keys_to_keep: string[]): Promise<any[]> {
        return array.map(o => keys_to_keep.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
        }, {}));
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
                menu: await this.redux(is_correct.role.menu, ['link'])
            };

            return {
                user: payload,
                access_token: this.jwtService.sign(payload),
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
                menu: await this.redux(isCreated.role.menu, ['link'])
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
