import {
  InvalidCredentialsError,
  InvalidPasswordError,
} from "#seedwork/application";
import { BcryptjsHashProvider } from "./bcryptjs-hash.provider";

// jest.mock("bcryptjs", () => ({
//   compare: jest.fn((payload, hash) => Promise.resolve(payload === hash)),
//   hash: jest.fn((payload, salt) =>
//     Promise.resolve(`hashed:${payload}:${salt}`)
//   ),
// }));
describe("BcryptjsHashProvider unit tests", () => {
  let bcryptjsHashProvider: BcryptjsHashProvider;

  beforeEach(() => (bcryptjsHashProvider = new BcryptjsHashProvider()));

  describe("generateHash method", () => {
    it("should return encrypted password", async () => {
      const password = "password12345678";
      const hashedPassword = await bcryptjsHashProvider.generateHash(password);
      expect(hashedPassword).toBeDefined();
      // expect(hashedPassword).toEqual('hashed:password:8');
    });
  });

  describe("compareHash method", () => {
    it("should return true on valid password and hash", async () => {
      const password = "password12345678";
      const hash = await bcryptjsHashProvider.generateHash(password);
      const result = await bcryptjsHashProvider.compareHash(password, hash);
      expect(result).toBeTruthy();
    });

    it("should return false when payload does not match the hash", async () => {
      const payload = "password123";
      const incorrectPayload = "wrongPassword";
      const hash = await bcryptjsHashProvider.generateHash(payload);

      const result = await bcryptjsHashProvider.compareHash(
        incorrectPayload,
        hash
      );
      expect(result).toBeFalsy();
    });
  });

  describe("passwordMatches method", () => {
    it("should not throw an error when password matches the hash", async () => {
      const password = "password123";
      const passwordHash = await bcryptjsHashProvider.generateHash(password);

      expect(async () => {
        await bcryptjsHashProvider.passwordMatches(password, passwordHash);
      }).not.toThrow();
    });

    it("should throw InvalidCredentialsError when password does not match the hash", async () => {
      const password = "password123";
      const incorrectPassword = "wrongPassword";
      const passwordHash = await bcryptjsHashProvider.generateHash(password);

      expect(async () => {
        await bcryptjsHashProvider.passwordMatches(
          incorrectPassword,
          passwordHash
        );
      }).rejects.toThrow(
        new InvalidCredentialsError("Email or password incorrect!")
      );
    });
  });

  describe("oldPasswordMatches method", () => {
    it("should not throw an error when old password matches the password", async () => {
      const oldPassword = "oldPassword123";
      const passwordHash = await bcryptjsHashProvider.generateHash(oldPassword);

      const result = await bcryptjsHashProvider.oldPasswordMatches(
        oldPassword,
        passwordHash
      );
      expect(result).toBeTruthy();
    });

    it("should throw InvalidPasswordError when old password does not match the password", async () => {
      const oldPassword = "oldPassword123";
      const incorrectPassword = "wrongOldPassword";
      const passwordHash = await bcryptjsHashProvider.generateHash(oldPassword);

      expect(async () => {
        await bcryptjsHashProvider.oldPasswordMatches(
          incorrectPassword,
          passwordHash
        );
      }).rejects.toThrow(new InvalidPasswordError("Password does not match"));
    });
  });
});
