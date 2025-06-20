import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoggedUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument} from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
                                        private readonly authService: AuthService,){}
    
    async validateLogin(loggedUserDto: LoggedUserDto) {
        const userNameFromDto = loggedUserDto.userName;
        const user = await this.userModel.findOne({userName: userNameFromDto});
        if(user && user.password!)
        {
            const result = await bcrypt.compare(loggedUserDto.password, user.password)
            if (result) 
            {
                const jwtRetornado = await this.authService.generateToken(loggedUserDto);
                return 
                {
                    token: jwtRetornado.token
                }
            }        
        }
        return null;
    }

    async updateUser(id: any, updatedUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updatedUserDto, {new: true});
    }
    async createUser(createUserDto: CreateUserDto) : Promise<User> {
        const valorAleatorio = await bcrypt.genSalt(10);
        const passCifrada = await bcrypt.hash(createUserDto.password,valorAleatorio);
        const userSafe = {
            ...createUserDto,
            password: passCifrada,
        }
        return this.userModel.create(userSafe);
    }

    async getOneById(id: string) : Promise<User | null>{
        const targetUser = await this.userModel.findById(id);
        if(targetUser){
            return targetUser;
        }
        return null;
    }

    async getAll() : Promise<User[]>{
        return this.userModel.find();
    }
}
