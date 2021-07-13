import { IsArray, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    nama_role: string;

    @IsArray()
    menu: number[];
}
