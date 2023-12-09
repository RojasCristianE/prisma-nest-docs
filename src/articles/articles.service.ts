import { Injectable } from '@nestjs/common';
import {
    CreateArticleDto,
    UpdateArticleDto
} from './dto';
import { PrismaService } from '../prisma';

@Injectable()
export class ArticlesService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: CreateArticleDto) {
        return this.prisma.article.create({ data });
    }

    findAllByStatus(published = true) {
        return this.prisma.article.findMany({ where: { published } });
    }

    findOne(id: number) {
        return this.prisma.article.findUnique({ where: { id }, include: { author: true } });
    }

    update(id: number, data: UpdateArticleDto) {
        return this.prisma.article.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.prisma.article.delete({ where: { id } });
    }
}
