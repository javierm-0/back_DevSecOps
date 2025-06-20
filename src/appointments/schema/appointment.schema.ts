import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment{

    @Prop({required: true, unique: true })
    name : string;

    @Prop({required: true})
    date : Date;

    @Prop({required: true})
    info: string;

    @Prop ({required: true})
    userid : string;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)