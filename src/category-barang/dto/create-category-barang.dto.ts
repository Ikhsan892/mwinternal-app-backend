import { IsString } from "class-validator";

export class CreateCategoryBarangDto {
    @IsString()
    nama_category: string;
}
