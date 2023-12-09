import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
    ParseIntPipe,
    NotFoundException,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { UsersService } from './';
import { UserEntity } from './entities';
import {
    CreateUserDto,
    UpdateUserDto
} from './dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
    @ApiCreatedResponse({ type: UserEntity })
	async create(@Body() data: CreateUserDto) {
		return new UserEntity(await this.usersService.create(data));
	}

	@Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity, isArray: true })
	async findAll() {
		const users = await this.usersService.findAll();

        return users.map(user => new UserEntity(user));
	}

	@Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity })
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const user = await this.usersService.findOne(id);

        if (!user) throw new NotFoundException(`User with id ${id} does not exist.`);

        return new UserEntity(user);
	}

	@Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity })
	async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
		return new UserEntity(await this.usersService.update(id, data));
	}

	@Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity })
	async remove(@Param('id', ParseIntPipe) id: number) {
		return new UserEntity(await this.usersService.remove(id));
	}
}
