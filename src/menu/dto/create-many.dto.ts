import { IsArray } from "class-validator";

export class CreateMenuManyDto {
    @IsArray()
    data: []
}
