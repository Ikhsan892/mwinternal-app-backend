import { IsBoolean, IsNumber } from "class-validator";

export class ActiveBiayaTambahanDTO {
    @IsNumber()
    id: number
}
