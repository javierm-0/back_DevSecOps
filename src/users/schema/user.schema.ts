import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;
@Schema()
export class User{
    @Prop({required: true})
    userName : string;

    @Prop({required: false})
    password : string;
    
    @Prop({required: false})
    grades : number[];
}

export const UserSchema = SchemaFactory.createForClass(User);