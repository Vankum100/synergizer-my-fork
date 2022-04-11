import { Injectable } from '@nestjs/common';
import { IHelloRespond } from '@synergizer/common';

@Injectable()
export class AppService {
  getHello(): IHelloRespond {
    return {
      message: 'Hello world!',
    };
  }
}
