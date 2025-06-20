import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentDto } from "./dto/appointment.dto";


@Controller ('appointments')
export class AppointmentController {
    constructor(private readonly appointmementService: AppointmentService) {}


    @Post('/createAppointment')
    async createAppintment (@Body() appointment: AppointmentDto){
        return this.appointmementService.createAppointment(appointment);
    }

    @Get('/getByUserId/:userid')
    async getAllAppointmentsByUserId(@Param('userid') userid: string) {
        return this.appointmementService.getAllAppointmentsByUserId(userid);
    }

    @Post('/deleteAppointment')
    async deleteAppointment(@Body('id') id: string) {
        return this.appointmementService.deleteAppointment(id);
    }

    @Post('/updateAppointment')
    async updateAppointment(@Body('id') id: string, @Body() appointment: AppointmentDto) {
        return this.appointmementService.updateAppointment(id, appointment);
    }



}