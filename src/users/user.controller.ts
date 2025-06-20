import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoggedUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllUsers(){
        return this.userService.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUserById(@Param('id') id : string){
        return this.userService.getOneById(id);
    }
    
    @Post('/createUser')
    async createUser(@Body() userDto : CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/updateUser/:id')
    async updateUser(@Body() updatedUserDto : UpdateUserDto, @Param('id') id : string){
        return this.userService.updateUser(id, updatedUserDto);
    }

    @Post('/validateLogin')
    async login(@Body() loggedUserDto : LoggedUserDto, @Res() res: Response){
        const result = await this.userService.validateLogin(loggedUserDto);

        if (!result) {
            return res.status(HttpStatus.UNAUTHORIZED).json({message: 'Usuario y/o Contraseña incorrectos'});
        }

        return res.status(HttpStatus.CREATED).json(result);
    }
}
