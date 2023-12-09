import { Module } from '@nestjs/common';
import { UsersService, UsersController } from './';
import { PrismaModule } from '../prisma';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [PrismaModule],
    exports: [UsersService]
})
export class UsersModule { }
