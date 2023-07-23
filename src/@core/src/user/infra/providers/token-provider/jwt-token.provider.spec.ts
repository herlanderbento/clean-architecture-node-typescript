import { JwtTokenProvider } from "./jwt-token.provider";

describe("JwtTokenProvider", () => {
  let tokenProvider;
  const secret = "test-secret";

  beforeEach(() => {
    tokenProvider = new JwtTokenProvider();
  });

  describe("createToken", () => {
    it("should create a valid token", () => {
      const expiresIn = "1h";
      const payload = { userId: 12345, name: "Herlander" };
      const subject = "user-auth";

      const token = tokenProvider.createToken(
        payload,
        secret,
        expiresIn,
        subject
      );
      expect(typeof token).toBe("string");
      expect(token).toBeTruthy();
    });
  });

  describe("checkToken", () => {
    it("should return token payload when token is valid", () => {
      const expiresIn = "1h";
      const payload = { userId: 12345 };
      const subject = "user-auth";

      const token = tokenProvider.createToken(
        payload,
        secret,
        expiresIn,
        subject
      );
      const result = tokenProvider.checkToken(token, secret);

      expect(typeof result).toBe("object");
      expect(result).toMatchObject(payload);
    });

    it("should throw an error when token is invalid", () => {
      const expiresIn = "1h";
      const payload = { userId: 12345 };
      const subject = "user-auth";

      const token = tokenProvider.createToken(
        payload,
        secret,
        expiresIn,
        subject
      );

      const invalidToken = token.slice(0, -1);

      let error;

      try {
        tokenProvider.checkToken(invalidToken, secret);
      } catch (err) {
        error = err;
      }

      expect(error).toBeTruthy();
      expect(error.name).toBe("JsonWebTokenError");
    });
  });
});
