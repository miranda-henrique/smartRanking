import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { UpdatePlayerDTO } from './dto/updatePlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Query } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(
        @InjectModel('Player')
        private readonly playerModel: Model<Player>
    ) { }


    async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        const { email } = createPlayerDTO;
        const foundPlayer = await this.playerModel.findOne({ email: email }).exec();

        if (foundPlayer) {
            throw new BadRequestException(`Player with email ${email} is already registered.`);
        } else {
            const createdPlayer = new this.playerModel(createPlayerDTO);

            return await createdPlayer.save();
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async getPlayerById(_id: string): Promise<Player> {
        const foundPlayer = await this.playerModel.findOne({ _id: _id }).exec();

        if (!foundPlayer) {
            throw new NotFoundException(`No player found with _id: ${_id}`);
        }

        return foundPlayer;
    }

    async updatePlayer(_id: string, updatePlayerDTO: UpdatePlayerDTO): Promise<void> {
        const foundPlayer = await this.playerModel.findOne({ _id: _id }).exec();

        if (!foundPlayer) {
            throw new NotFoundException(`No player found with _id: ${_id}`);
        } else {
            await this.playerModel.findOneAndUpdate({
                //Search by
                _id: _id,
            }, {
                //Update with
                $set: updatePlayerDTO,
            }).exec();
        }
    }

    async deletePlayerById(_id: string): Promise<any> {
        const foundPlayer = this.playerModel.findOne({ _id: _id });

        if (!foundPlayer) {
            throw new NotFoundException(`No player found with _id: ${_id}`);
        }

        return await this.playerModel.deleteOne({ _id: _id }).exec();
    };
}

