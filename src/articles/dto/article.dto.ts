import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @ApiProperty()
    title: string = '';

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({ required: false })
    description?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body: string = '';

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: false })
    published?: boolean = false;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}