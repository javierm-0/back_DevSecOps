import { Exclude, Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, isString, IsString } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    userName : string;

    @IsString()
    @IsNotEmpty()
    password : string;
        
    @IsOptional()
    @IsArray()
    @IsNumber({}, {each : true})
    grades : number[];
}

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    userName: string;
    
    @IsOptional()
    @IsArray()
    @IsNumber({}, {each : true})
    grades : number[];
}

export class LoggedUserDto{
    @IsNotEmpty()
    @IsString()
    userName!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}