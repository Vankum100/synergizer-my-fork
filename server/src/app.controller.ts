import { Controller, Get } from '@nestjs/common';
import { IHelloRespond } from '@synergizer/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): IHelloRespond {
    return this.appService.getHello();
  }
}
