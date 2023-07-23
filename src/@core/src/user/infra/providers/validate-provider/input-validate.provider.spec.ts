import {
  BadRequestError,
  InvalidPasswordError,
} from "../../../../@seedwork/application";
import { InputValidateProvider } from "./input-validate.provider";

describe("InputValidateProvider", () => {
  let validateProvider: InputValidateProvider;

  beforeEach(() => {
    validateProvider = new InputValidateProvider();
  });

  describe("updatePassword method", () => {
    it("should throw InvalidPasswordError if old password is not provided", () => {
      const oldPassword = "";
      const newPassword = "newPassword123";

      expect(() => {
        validateProvider.updatePassword(oldPassword, newPassword);
      }).toThrow(InvalidPasswordError);
      expect(() => {
        validateProvider.updatePassword(oldPassword, newPassword);
      }).toThrow("Old password is required");
    });

    it("should throw InvalidPasswordError if new password is not provided", () => {
      const oldPassword = "oldPassword123";
      const newPassword = "";

      expect(() => {
        validateProvider.updatePassword(oldPassword, newPassword);
      }).toThrow(InvalidPasswordError);
      expect(() => {
        validateProvider.updatePassword(oldPassword, newPassword);
      }).toThrow("New password is required");
    });

    it("should throw InvalidPasswordError when the new password is the same as the old password", () => {
      const oldPassword = "password123";
      const newPassword = "password123";

      expect(() => {
        validateProvider.updatePassword(oldPassword, newPassword);
      }).toThrow(InvalidPasswordError);
      expect(() => {
        validateProvider.updatePassword(oldPassword, newPassword);
      }).toThrow("Password should be different from old password!");
    });

    it("should not throw any error if both old and new passwords are provided", () => {
      const oldPassword = "oldPassword123";
      const newPassword = "newPassword123";

      expect(() => {
        validateProvider.updatePassword(oldPassword, newPassword);
      }).not.toThrow();
    });
  });

  describe("authenticate method", () => {
    it("should throw BadRequestError if email is not provided", () => {
      const email = "";
      const password = "password123";

      expect(() => {
        validateProvider.authenticate(email, password);
      }).toThrow(BadRequestError);
      expect(() => {
        validateProvider.authenticate(email, password);
      }).toThrow("Email should not be empty");
    });

    it("should throw BadRequestError if password is not provided", () => {
      const email = "test@example.com";
      const password = "";

      expect(() => {
        validateProvider.authenticate(email, password);
      }).toThrow(BadRequestError);
      expect(() => {
        validateProvider.authenticate(email, password);
      }).toThrow("Password should not be empty");
    });

    it("should not throw any error if both email and password are provided", () => {
      const email = "test@example.com";
      const password = "password123";

      expect(() => {
        validateProvider.authenticate(email, password);
      }).not.toThrow();
    });
  });
});
