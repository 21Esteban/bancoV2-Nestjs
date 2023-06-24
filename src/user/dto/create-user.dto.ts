import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsEnum, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}