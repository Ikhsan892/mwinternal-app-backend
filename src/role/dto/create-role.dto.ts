import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    nama_role: string;
}
