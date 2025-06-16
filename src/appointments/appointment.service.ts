import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment } from "./schema/appointment.schema";
import { Model } from "mongoose";
import { AppointmentDto } from "./dto/appointment.dto";


@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private appointmentModel : Model<Appointment>) {}

    async getAllAppointmentsByUserId(userid: number ) : Promise <Appointment[]>{
        return await this.appointmentModel.find({userid: userid});
    }

    async createAppointment(appointment: AppointmentDto) : Promise<Appointment> {
        return await this.appointmentModel.create(appointment);
    }
}