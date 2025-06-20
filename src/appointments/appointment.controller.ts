import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentDto, AppointmentDtoFromUser, UpdateAppointmentDtoFromUser } from "./dto/appointment.dto";
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
    @Post('/deleteAppointment/:id')
    async deleteAppointment(@Req() req, @Param('id') idAppointment: string) {
        return this.appointmementService.deleteAppointment(idAppointment, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/updateAppointment/:id')
    async updateAppointment(@Req() req, @Param('id') idAppointment:string,@Body() appointment: UpdateAppointmentDtoFromUser) {
        return this.appointmementService.updateAppointment(idAppointment, req.user.userId, appointment);
    }



}