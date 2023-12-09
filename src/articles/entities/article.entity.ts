import { Article } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities';

export class ArticleEntity implements Article {
    @ApiProperty()
    id: number = 0;

    @ApiProperty()
    title: string = '';

    @ApiProperty({ required: false, nullable: true })
    description: string | null = null;

    @ApiProperty()
    body: string = '';

    @ApiProperty()
    published: boolean = false;

    @ApiProperty()
    createdAt: Date = new Date();

    @ApiProperty()
    updatedAt: Date = new Date();

    @ApiProperty({ required: false, nullable: true })
    authorId: number | null = null;

    @ApiProperty({ required: false, type: UserEntity, nullable: true })
    author?: UserEntity | null = null;

    constructor({ author, ...data }: Partial<ArticleEntity>) {
        Object.assign(this, data);

        this.author = author && new UserEntity(author);
    }
}