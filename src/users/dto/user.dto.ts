import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    userName : string;

    @IsString()
    @IsNotEmpty()
    password : string;

}

export class UpdateUserDto{
    @IsNotEmpty()
    @IsString()
    userName : string;

    @IsOptional()
    @IsString()
    password: string;
}

export class LoggedUserDto{
    @IsNotEmpty()
    @IsString()
    userName!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}