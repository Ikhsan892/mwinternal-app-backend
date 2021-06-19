import { IsBoolean, IsString } from "class-validator";

export class CreatePaymentMethodDto {
    @IsString()
    name_payment : string;

    @IsBoolean()
    aktif : boolean;
}
