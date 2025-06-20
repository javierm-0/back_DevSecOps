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