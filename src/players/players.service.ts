import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(
        @InjectModel('Player')
        private readonly playerModel: Model<Player>
    ) { }


    async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = createPlayerDTO;
        const foundPlayer = await this.playerModel.findOne({ email: email }).exec();

        if (foundPlayer) {
            await this.updatePlayer(createPlayerDTO);
        } else {
            await this.createPlayer(createPlayerDTO);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const foundPlayer = await this.playerModel.findOne({ email: email }).exec();

        if (!foundPlayer) {
            throw new NotFoundException(`Player with email ${email} not found.`);
        }

        return foundPlayer;
    }

    private async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        const createdPlayer = new this.playerModel(createPlayerDTO);

        return await createdPlayer.save();
    }

    private async updatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        return await this.playerModel.findOneAndUpdate({
            //Search by
            email: createPlayerDTO.email,
        }, {
            //Update with
            $set: createPlayerDTO,
        }).exec();
    }

    //Check for a replacement for "any" later
    async deletePlayerByEmail(email: string): Promise<any> {
        return await this.playerModel.remove({ email }).exec();
    }
}
