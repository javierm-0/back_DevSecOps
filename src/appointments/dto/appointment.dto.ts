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
    userid!: string;
}

export class AppointmentDtoFromUser{
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    info?: string;
}
