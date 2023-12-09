import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities';
import { AuthDto } from './dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('signin')
    @ApiOkResponse({ type: AuthEntity })
    signin(@Body() {email, password}: AuthDto) {
        return this.auth.signin(email, password);
    }
}
