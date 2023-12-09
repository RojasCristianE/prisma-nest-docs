import {
    ArgumentsHost,
    Catch,
    HttpStatus
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost
    ) {
        const
            response = host
                        .switchToHttp()
                        .getResponse<FastifyReply>(),
            message = exception.message.replace(/\n/g, '');

        switch (exception.code) {
            case 'P2002': {
                const statusCode = HttpStatus.CONFLICT;

                response
                    .status(statusCode)
                    .send({ statusCode, message });

                break;
            }
            default:
                super.catch(exception, host);
                break;
        }
    }
}

