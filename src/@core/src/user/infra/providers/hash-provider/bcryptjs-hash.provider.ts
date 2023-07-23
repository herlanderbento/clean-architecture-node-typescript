import { compare, hash } from "bcryptjs";
import { HashProvider } from "../../../../@seedwork/application/providers/hash-provider";
import {
  InvalidCredentialsError,
  InvalidPasswordError,
} from "../../../../@seedwork/application";

export class BcryptjsHashProvider implements HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hash: string): Promise<boolean> {
    return await compare(payload, hash);
  }

  public async passwordMatches(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    const result = await compare(password, passwordHash);
    if (!result) {
      throw new InvalidCredentialsError("Email or password incorrect!");
    }
    return result;
  }

  public async oldPasswordMatches(
    oldPassword: string,
    password: string
  ): Promise<boolean> {
    const result = await compare(oldPassword, password);

    if (!result) {
      throw new InvalidPasswordError("Password does not match");
    }

    return result;
  }
}

export default BcryptjsHashProvider;
