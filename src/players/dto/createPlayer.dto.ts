import { IsEmail, IsNotEmpty } from 'class-validator';

class CreatePlayerDTO {

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly name: string;
}

export { CreatePlayerDTO };