import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentDto, AppointmentDtoFromUser } from "./dto/appointment.dto";
import { AuthGuard } from "@nestjs/passport";


@Controller ('appointments')
export class AppointmentController {
    constructor(private readonly appointmementService: AppointmentService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/createAppointment')
    async createAppintment(@Req() req, @Body() appointment: AppointmentDtoFromUser){
        const validApmnt :AppointmentDto = {
            ...appointment,
            userid: req.user.userId,
            date: new Date(Date.now()),
        };
        return this.appointmementService.createAppointment(validApmnt);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getByUserId/')
    async getAllAppointmentsByUserId(@Req() req) {
        return this.appointmementService.getAllAppointmentsByUserId(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/deleteAppointment')
    async deleteAppointment(@Req() req) {
        return this.appointmementService.deleteAppointment(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/updateAppointment')
    async updateAppointment(@Req() req,@Body() appointment: AppointmentDto) {
        return this.appointmementService.updateAppointment(req.user.userId, appointment);
    }



}