import { JwtPayload } from "jsonwebtoken";

export interface TokenProvider {
  checkToken(token: string, secret_token: string): string | JwtPayload;
  createToken(
    payload: string | Buffer | object,
    secret: string,
    expiresIn: string,
    subject?: string | undefined
  ): string;
}
