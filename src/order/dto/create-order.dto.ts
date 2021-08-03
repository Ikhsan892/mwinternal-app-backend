import { IsDateString, IsString } from "class-validator";
import { CreatePelangganDto } from "src/pelanggan/dto/create-pelanggan.dto";

export class CreateOrderDto extends CreatePelangganDto {
    @IsString()
    no_invoice: string;

    @IsDateString()
    tanggal_invoice: Date;
}
