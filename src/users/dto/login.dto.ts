import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'This is not a valid email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}