import {
  Controller,
  Get,
  Redirect,
  Request,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { IHelloRespond, IUserInfoResponse } from '@synergizer/common';
import { Response } from 'express';

import { LoginGuard } from '../guards/login.guard';

@Controller()
export class AuthController {
  @UseGuards(LoginGuard)
  @Get('/login')
  login() {
    return;
  }

  @Get('/user')
  user(@Request() req: any): IUserInfoResponse | IHelloRespond {
    return req.user ?? 'Hello you are not logged in';
  }

  @UseGuards(LoginGuard)
  @Get('/callback')
  @Redirect('/user')
  loginCallback() {}

  @Get('/logout')
  @Redirect('/')
  logout(@Session() session: any, @Res() res: Response) {
    session.destroy(() => false);

    res.clearCookie('synergizer');
  }
}
