import { IsBoolean, IsNumber } from "class-validator";

export class ActivePaymentMethodDto {
    @IsNumber()
    id : number
}
