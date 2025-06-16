import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AppointmentDto{

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    date!: Date;

    @IsString()
    @IsOptional()
    info?: string;

    @IsString()
    @IsNotEmpty()
    userid!: number;
}
