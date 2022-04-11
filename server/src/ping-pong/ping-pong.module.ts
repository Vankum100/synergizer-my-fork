import { Module } from '@nestjs/common';

import { PingPongService } from './ping-pong.service';

@Module({
  providers: [PingPongService],
})
export class PingPongModule {}
