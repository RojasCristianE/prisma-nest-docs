import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    NotFoundException
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { ArticleEntity } from './entities';
import { ArticlesService } from './';
import {
    CreateArticleDto,
    UpdateArticleDto
} from './dto';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @ApiCreatedResponse({ type: ArticleEntity })
    async create(@Body() data: CreateArticleDto) {
        return new ArticleEntity(await this.articlesService.create(data));
    }

    @Get()
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    async findAll() {
        const articles = await this.articlesService.findAllByStatus();

        return articles.map((article) => new ArticleEntity(article));
    }

    @Get('drafts')
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    async findDrafts() {
        const articles = await this.articlesService.findAllByStatus(false);

        return articles.map((article) => new ArticleEntity(article));
    }

    @Get(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const article = await this.articlesService.findOne(id);

        if (!article) throw new NotFoundException(`Article with id ${id} does not exist.`);

        return new ArticleEntity(article);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateArticleDto) {
        return new ArticleEntity(await this.articlesService.update(id, data));
    }

    @Delete(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return new ArticleEntity(await this.articlesService.remove(id));
    }
}
