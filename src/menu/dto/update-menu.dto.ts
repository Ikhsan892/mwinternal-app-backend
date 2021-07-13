import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    @IsString()
    nama_menu: string;

    @IsString()
    link: string;
}
