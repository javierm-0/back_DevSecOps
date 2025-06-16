import { Body, Controller, Post } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentDto } from "./dto/appointment.dto";


@Controller ('appointments')
export class AppointmentController {
    constructor(private readonly appointmementService: AppointmentService) {}


    @Post('/createAppointment')
    async createAppintment (@Body() appointment: AppointmentDto){
        return this.appointmementService.createAppointment(appointment);
    }

}