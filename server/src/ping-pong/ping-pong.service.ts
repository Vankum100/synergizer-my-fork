import { Injectable } from '@nestjs/common';

import { HelloRespondDto } from './dto/hello-respond.dto';

@Injectable()
export class PingPongService {
  sendPong(): HelloRespondDto {
    return {
      message: 'pong',
    };
  }
}
