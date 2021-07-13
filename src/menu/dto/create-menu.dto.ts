import { IsString } from "class-validator";

export class CreateMenuDto {
    @IsString()
    nama_menu: string;

    @IsString()
    link: string;
}
