import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import * as config from 'config';
// import { UserKakaoDto } from './dto/user.kakao.dto';

const kakaoConfig = config.get('kakao');

export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // clientId: kakaoConfig.clientID,
      // callbackURL: kakaoConfig.callbackURL,
      clientID: kakaoConfig.clientID,
      redirectURL: kakaoConfig.redirectURL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJSON = profile._json;
    const kakao_account = profileJSON.kakao_account;
    const payload = {
      name: kakao_account.profile.nickname,
      kakaoId: profileJSON.id,
      email:
        kakao_account.has_email && !kakao_account.email_needs_agreement
          ? kakao_account.email
          : null,
    };
    done(null, payload);
  }
}
