import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment } from "./schema/appointment.schema";
import { Model } from "mongoose";
import { AppointmentDto } from "./dto/appointment.dto";


@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private readonly appointmentModel : Model<Appointment>) {}

    async getAllAppointmentsByUserId(userid: string ) : Promise <Appointment[]>{
        const apmnt = await this.appointmentModel.find({userid: userid});
        if(!apmnt){throw new NotFoundException("no existe appointment");}
        return apmnt
    }

    async createAppointment(appointment: AppointmentDto) : Promise<Appointment> {
        const foundAppointment = await this.appointmentModel.create(appointment);
        if(!foundAppointment){
            throw new Error("no se puede crear appointment");
        }
        return foundAppointment;
    }

    async deleteAppointment(id: string) : Promise<Appointment | null> {
        return await this.appointmentModel.findByIdAndDelete(id);
    }

    async updateAppointment(id: string, appointment: AppointmentDto) : Promise<Appointment | null> {
        return await this.appointmentModel.findByIdAndUpdate(id, appointment, {new: true});
    }


}