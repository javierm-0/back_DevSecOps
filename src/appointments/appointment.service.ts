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

    //retorna el appointment borrado o null(si no existe)
    async deleteAppointment(id: string) : Promise<Appointment | null> {
        const res = await this.appointmentModel.findByIdAndDelete(id);
        if(!res){
            throw new NotFoundException("No hay appointment con ese id");
        }
        return res;
    }
    //retorna el appointment nuevo o null(si no existe)
    async updateAppointment(id: string, appointment: AppointmentDto) : Promise<Appointment | null> {
        const res = await this.appointmentModel.findByIdAndUpdate(id, appointment, {new: true});
        if(!res){
            throw new NotFoundException("No hay appointment con ese id");
        }
        return res;
    }


}