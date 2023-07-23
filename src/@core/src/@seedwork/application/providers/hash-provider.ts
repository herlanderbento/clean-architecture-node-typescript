export interface HashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hash: string): Promise<boolean>;
  passwordMatches(password: string, passwordHash: string): Promise<boolean>;
  oldPasswordMatches(
    oldPassword: string,
    password: string
  ): Promise<boolean>;
}
export default HashProvider;
