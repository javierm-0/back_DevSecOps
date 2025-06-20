import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
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
    @Post('/deleteAppointment/:id')
    async deleteAppointment(@Param('id') idAppointment: string) {
        return this.appointmementService.deleteAppointment(idAppointment);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/updateAppointment/:id')
    /**
     * "name" es obligatorio (aunque sea el mismo xd)
     */
    async updateAppointment(@Param('id') idAppointment:string,@Body() appointment: AppointmentDtoFromUser) {
        return this.appointmementService.updateAppointment(idAppointment, appointment);
    }



}