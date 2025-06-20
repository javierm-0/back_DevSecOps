import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment } from "./schema/appointment.schema";
import { Model } from "mongoose";
import { AppointmentDto } from "./dto/appointment.dto";


@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private appointmentModel : Model<Appointment>) {}

    async getAllAppointmentsByUserId(userid: string ) : Promise <Appointment[]>{
        return await this.appointmentModel.find({userid: userid});
    }

    async createAppointment(appointment: AppointmentDto) : Promise<Appointment> {
        return await this.appointmentModel.create(appointment);
    }

    async deleteAppointment(id: string) : Promise<Appointment | null> {
        return await this.appointmentModel.findByIdAndDelete(id);
    }

    async updateAppointment(id: string, appointment: AppointmentDto) : Promise<Appointment | null> {
        return await this.appointmentModel.findByIdAndUpdate(id, appointment, {new: true});
    }


}