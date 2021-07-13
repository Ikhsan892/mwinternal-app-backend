import { IsNumber } from "class-validator";

export class ActivePengirimanDto {
    @IsNumber()
    id: number
}
