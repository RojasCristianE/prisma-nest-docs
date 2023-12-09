import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { User } from "@prisma/client";
import { ArticleEntity } from "../../articles/entities/";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number = 0;

    @ApiProperty({ required: false, nullable: true })
    name: string | null = null;

    @ApiProperty()
    email: string = '';

    @Exclude()
    password: string = '';

    @ApiProperty()
    createdAt: Date   = new Date();

    @ApiProperty()
    updatedAt: Date   = new Date();

    @ApiProperty()
    articles? = new Array<ArticleEntity>();
}