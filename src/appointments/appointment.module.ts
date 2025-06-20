import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment, AppointmentSchema } from "./schema/appointment.schema";
import { AuthModule } from "src/auth/auth.module";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";



@Module ({
    imports: [MongooseModule.forFeature([{name: Appointment.name, schema: AppointmentSchema}]),AuthModule], 
    controllers: [AppointmentController],
    providers: [AppointmentService],
    exports: [AppointmentService],
})  

export class AppointmentModule {}