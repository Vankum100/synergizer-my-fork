import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { authValidationSchema } from './auth/config/auth.config';
import { nodeValidationSchema } from './config/node.config';
import { storageValidationSchema } from './config/storage.config';
import { PingPongModule } from './ping-pong/ping-pong.module';
import { socketValidationSchema } from './socket/config/socket.config';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
        cache: true,
      },
      validationSchema: nodeValidationSchema
        .concat(socketValidationSchema)
        .concat(authValidationSchema)
        .concat(storageValidationSchema),
    }),
    SocketModule,
    PingPongModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
