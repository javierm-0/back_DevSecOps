import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggedUserDto } from 'src/users/dto/user.dto';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, @InjectModel(User.name) private userModel : Model<UserDocument>){}

    async generateToken(user: LoggedUserDto) : Promise<{token: string}> {
        const mongoUser  = await this.userModel.findOne({"userName":user.userName});//←obtengo version con id
        if(!mongoUser){
            throw new Error("No se encuentra ningun usuario bajo ese nombre");
        }
        const payload = {sub: mongoUser._id, userName: mongoUser.userName};
        return {
            token: this.jwtService.sign(payload),
        };
    }

}
