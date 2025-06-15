import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoggedUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    async getAllUsers(){
        return this.userService.getAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id : string){
        return this.userService.getOneById(id);
    }

    @Post('/createUser')
    async createUser(@Body() userDto : CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @Patch('/updateUser/:id')
    async updateUser(@Body() updatedUserDto : UpdateUserDto, @Param('id') id : string){
        return this.userService.updateUser(id, updatedUserDto);
    }

    @Post('/validateLogin')
    async login(@Body() loggedUserDto : LoggedUserDto){
        const resultado = await this.userService.validateLogin(loggedUserDto);
        if(resultado === false){
            throw new BadRequestException('Usuario o contraseña incorrecta');
        }
        return resultado;
    }
}
