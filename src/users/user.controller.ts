import { Body, Controller, Get, Patch, Post, UseGuards, Res, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoggedUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    /*
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllUsers(){
        return this.userService.getAll();
    }descomentar solo si se va a usar*/

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserById(@Req() req){
        return this.userService.getOneById(req.user.userId);
    }
    
    @Post('/createUser')
    async createUser(@Body() userDto : CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/updateUser/')
    async updateUser(@Req() req, @Body() updatedUserDto : UpdateUserDto){
        return this.userService.updateUser(req.user.userId, updatedUserDto);
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
