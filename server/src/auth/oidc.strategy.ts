import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IUserInfoResponse } from '@synergizer/common';
import { Client, custom, Issuer, Strategy, TokenSet } from 'openid-client';

custom.setHttpOptionsDefaults({
  timeout: 7500,
});

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(private readonly client: Client) {
    super({
      client,
      params: {
        redirect_uri: process.env.REDIRECT_URI, // TODO Replace
        scope: process.env.LOGIN_SCOPE, // TODO Replace
      },
      passReqToCallback: false,
      usePKCE: false,
    });
    this.client = client;
  }

  async validate(tokenset: TokenSet): Promise<IUserInfoResponse> {
    const userInfo = await this.client.userinfo(tokenset);

    try {
      return {
        userId: userInfo.sub,
        accessToken: tokenset.access_token as string,
        refreshToken: tokenset.refresh_token as string,
        userName: userInfo.given_name as string,
        avatarUrl: userInfo.picture as string,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

export const oidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async () => {
    const trustIssuer = await Issuer.discover(
      process.env.OIDC_ISSUER as string
    ); // TODO Replace

    const client = new trustIssuer.Client({
      client_id: process.env.CLIENT_ID as string, // TODO Replace
      client_secret: process.env.CLIENT_SECRET as string, // TODO Replace
    });
    return new OidcStrategy(client);
  },
};
