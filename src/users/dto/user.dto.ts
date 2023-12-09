import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    name: string = '';

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string = '';

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    password: string = '';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}