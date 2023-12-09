import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret as secretOrKey}  from '../../auth.module';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private usersService: UsersService) {
        const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

        super({ jwtFromRequest, secretOrKey });
    }

    async validate(payload: { userId: number }) {
        const user = await this.usersService.findOne(payload.userId);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}