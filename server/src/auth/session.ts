import * as Store from 'connect-redis';
import * as session from 'express-session';

import { redisClient } from './redis.client';

const redisStore = Store(session);

// custom provider something that could inject config service and then passed to express session
export const userSession: session.SessionOptions = {
  store: new redisStore({
    client: redisClient as any,
    ttl: parseInt(process.env.MAX_AGE as string, 10), // TODO Replace
  }),
  name: 'synergizer',
  secret: process.env.SESSION_SECRET as string, // to sign session id //TODO Replace
  resave: false,
  saveUninitialized: false,
  rolling: false, // keep session alive
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // TODO Replace
    maxAge: parseInt(process.env.MAX_AGE as string, 10), // TODO Replace
  },
};
