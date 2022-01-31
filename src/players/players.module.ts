import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/player.schema';

@Module({
    controllers: [PlayersController],
    providers: [PlayersService],
    imports: [MongooseModule.forFeature([{
        name: 'Player',
        schema: PlayerSchema,
    }])],
})
export class PlayersModule { }
