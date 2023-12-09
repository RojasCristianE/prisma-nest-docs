import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
    CreateUserDto,
    UpdateUserDto
} from './dto/';
import { PrismaService } from '../prisma/prisma.service';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDto) {
        data.password = await bcrypt.hash(
            data.password,
            roundsOfHashing
        );

        return this.prisma.user.create({ data });
    }

    findAll() {
        return this.prisma.user.findMany({ include: { articles: true } });
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdateUserDto) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, roundsOfHashing)
        }

        return this.prisma.user.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
