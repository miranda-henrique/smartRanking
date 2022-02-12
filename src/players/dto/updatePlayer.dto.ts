import { IsNotEmpty } from 'class-validator';

class UpdatePlayerDTO {

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsNotEmpty()
    readonly name: string;
}

export { UpdatePlayerDTO };