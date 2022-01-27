import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
    private readonly logger = new Logger(PlayersService.name);
    private players: Player[] = [];

    async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = createPlayerDTO;

        const foundPlayer = await this.players.find(
            player => player.email === email
        );

        if (foundPlayer) {
            await this.updatePlayer(foundPlayer, createPlayerDTO);
        } else {
            await this.createPlayer(createPlayerDTO);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.players;
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const foundPlayer = await this.players.find(
            player => player.email === email
        );

        if (!foundPlayer) {
            throw new NotFoundException(`Player with email ${email} not found.`);
        }

        return foundPlayer;
    }

    private createPlayer(createPlayerDTO: CreatePlayerDTO): void {
        const { phoneNumber, email, name } = createPlayerDTO;

        const player: Player = {
            _id: uuidv4(),
            phoneNumber,
            email,
            name,
            ranking: 'A',
            rankingPosition: 1,
            playerImgUrl: 'https://www.google.com',
        };

        this.players.push(player);
        this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);
    }

    private updatePlayer(foundPlayer: Player, createPlayerDTO: CreatePlayerDTO): void {
        const { name } = createPlayerDTO;

        foundPlayer.name = name;
    }

    async deletePlayerByEmail(email: string): Promise<void> {
        const foundPlayer = await this.players.find(
            player => player.email === email
        );

        this.players = this.players.filter(
            player => player.email !== email
        );

    }
}
