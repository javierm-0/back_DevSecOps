import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointments/appointment.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    (()=>{
      const mongoUri = process.env.MONGO_URI;
      if(!mongoUri){
        throw new Error("Falta agregar la URI de mongodb");
      }
      return MongooseModule.forRoot(mongoUri);
    })(),
    UserModule,
    AuthModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
