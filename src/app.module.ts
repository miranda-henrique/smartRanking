import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DB_CONNECTION_STRING}`, {
      useNewUrlParser: true,
    }),
    PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
