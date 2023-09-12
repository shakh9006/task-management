import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({ example: 'john123', description: "User's username" })
  @IsString({ message: 'Must be string' })
  username: string;

  @ApiProperty({ example: 'john.doe@gmail.com', description: "User's email" })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ example: 'johndoe123', description: "User's password" })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Length must be at least 4 and max 16' })
  password: string;
}

export class LoginInput {
  @ApiProperty({ example: 'john.doe@gmail.com', description: "User's email" })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ example: 'johndoe123', description: "User's password" })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Length must be at least 4 and max 16' })
  password: string;
}

export class UserOutput {
  @ApiProperty({ example: '1', description: 'User id' })
  id: number;

  @ApiProperty({ example: 'john123', description: "User's username" })
  username: string;

  @ApiProperty({ example: 'john.doe@gmail.com', description: "User's email" })
  email: string;

  @ApiProperty({
    example: 'sadasd123123asdasdasd123.123123123123sdasd.asdasdasd21312',
    description: "User's token",
  })
  token?: string;
}

export class AddRoleInput {
  @IsString({ message: 'Must be string' })
  value: string;
  @IsNumber({}, { message: 'Must be number' })
  userId: number;
}

export class AddRoleOutput extends AddRoleInput {}
