import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Get()
    async getPlayers(@Query('email') email: string): Promise<Player | Player[]> {
        if (email) {
            return await this.playersService.getPlayerByEmail(email);
        } else {
            return await this.playersService.getAllPlayers();
        }
    }

    @Post()
    async createOrUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        await this.playersService.createOrUpdatePlayer(createPlayerDTO);
    }

    @Delete()
    async deletePlayerByEmail(@Query('email') email: string): Promise<void> {
        this.playersService.deletePlayerByEmail(email);
    }
}
