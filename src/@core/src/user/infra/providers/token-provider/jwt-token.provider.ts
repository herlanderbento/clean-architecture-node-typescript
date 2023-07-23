import { TokenProvider } from "../../../../@seedwork/application/providers/token-provider";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export class JwtTokenProvider implements TokenProvider {
  public checkToken(token: string, secret_token: string): string | JwtPayload {
    return verify(token, secret_token);
  }

  public createToken(
    payload: string | object | Buffer,
    secret: string,
    expiresIn: string,
    subject?: string
  ): string {
    return sign(payload, secret, {
      subject: subject,
      expiresIn: expiresIn,
    });
  }
}
