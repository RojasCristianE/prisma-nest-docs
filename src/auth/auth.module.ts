import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService, AuthController } from './';
import { PrismaModule } from '../prisma';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './dto/strategy/jwt.strategy';

export const  jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: jwtSecret,
            signOptions: { expiresIn: '360d' },
        }),
        UsersModule
    ],
})
export class AuthModule {}
