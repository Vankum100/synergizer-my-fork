import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: any): any {
    done(null, user);
  }
  deserializeUser(payload: string, done: any): any {
    done(null, payload);
  }
}
