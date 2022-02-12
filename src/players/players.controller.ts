import { Body, Controller, Get, Post, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { UpdatePlayerDTO } from './dto/updatePlayer.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { playersParametersValidationPipe } from './pipes/players-parameters-validation.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Get()
    async getPlayers(): Promise<Player[]> {
        return await this.playersService.getAllPlayers();
    }

    @Get('/:_id')
    async getPlayerById(@Param('_id', playersParametersValidationPipe) _id: string): Promise<Player> {
        return await this.playersService.getPlayerById(_id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        return await this.playersService.createPlayer(createPlayerDTO);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDTO: UpdatePlayerDTO,
        @Param('_id', playersParametersValidationPipe) _id: string): Promise<void> {
        await this.playersService.updatePlayer(_id, updatePlayerDTO);
    }

    @Delete('/:_id')
    async deletePlayerById(@Param('_id', playersParametersValidationPipe) _id: string): Promise<void> {
        this.playersService.deletePlayerById(_id);
    }
}
