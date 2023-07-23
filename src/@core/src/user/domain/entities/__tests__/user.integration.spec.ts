import { User } from "../user";

describe("User Integration Tests", () => {
  describe("create method", () => {
    it("should a inavlid user using name property", () => {
      expect(() => {
        new User({
          name: null,
          email: "email@example.com",
          password: "password",
        });
      }).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new User({
          name: "",
          email: "email@example.com",
          password: "password",
        });
      }).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => {
        new User({
          name: 5 as any,
          email: "email@example.com",
          password: "password",
        });
      }).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new User({
          name: "herlander".repeat(256),
          email: "email@example.com",
          password: "password",
        });
      }).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a inavlid user using email property", () => {
      expect(() => {
        new User({
          name: "jorge",
          email: null,
          password: "password",
        });
      }).containsErrorMessages({
        email: [
          "email should not be empty",
          "email must be an email",
          "email must be a string",
          "email must be shorter than or equal to 255 characters",
        ],
      });
      expect(() => {
        new User({
          name: "herlander",
          email: "",
          password: "password",
        });
      }).containsErrorMessages({
        email: ["email should not be empty", "email must be an email"],
      });

      expect(() => {
        new User({
          name: "John",
          email: 5 as any,
          password: "password",
        });
      }).containsErrorMessages({
        email: [
          "email must be an email",
          "email must be a string",
          "email must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new User({
          name: "herlander",
          email: "email@example.com".repeat(256),
          password: "password",
        });
      }).containsErrorMessages({
        email: [
          "email must be an email",
          "email must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("should a inavlid user using password property", () => {
      expect(() => {
        new User({
          name: "antonio gabriel",
          email: "email@example.com",
          password: null,
        });
      }).containsErrorMessages({
        password: [
          "password should not be empty",
          "password must be a string",
          "password must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new User({
          name: "marcia gaieta",
          email: "email@example.com",
          password: "",
        });
      }).containsErrorMessages({
        password: ["password should not be empty"],
      });

      expect(() => {
        new User({
          name: "paulo",
          email: "email@example.com",
          password: 5 as any,
        });
      }).containsErrorMessages({
        password: [
          "password must be a string",
          "password must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new User({
          name: "herlander",
          email: "email@example.com",
          password: "password".repeat(256),
        });
      }).containsErrorMessages({
        password: ["password must be shorter than or equal to 255 characters"],
      });
    });
  });

  describe("update method", () => {
    it("should a inavlid user using name property", () => {
      const user = new User({
        name: "herlander",
        email: "email@example.com",
        password: "password",
      });

      expect(() => user.update(null, "email@gmail.com")).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => user.update("", "email@gmail.com")).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() =>
        user.update(5 as any, "email@gmail.com")
      ).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        user.update("herlander".repeat(256), "email@gmail.com")
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a inavlid user using email property", () => {
      const user = new User({
        name: "herlander",
        email: "email@example.com",
        password: "password",
      });

      expect(() => user.update("herlander", null)).containsErrorMessages({
        email: [
          "email should not be empty",
          "email must be an email",
          "email must be a string",
          "email must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => user.update("herlander", "")).containsErrorMessages({
        email: ["email should not be empty", "email must be an email"],
      });

      expect(() => user.update("herlander", 5 as any)).containsErrorMessages({
        email: [
          "email must be an email",
          "email must be a string",
          "email must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        user.update("herlander", "email@gmail.com".repeat(256))
      ).containsErrorMessages({
        email: [
          "email must be an email",
          "email must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("should a inavlid user using password property", () => {
      expect(() => {
        new User({
          name: "antonio gabriel",
          email: "email@example.com",
          password: null,
        });
      }).containsErrorMessages({
        password: [
          "password should not be empty",
          "password must be a string",
          "password must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new User({
          name: "marcia gaieta",
          email: "email@example.com",
          password: "",
        });
      }).containsErrorMessages({
        password: ["password should not be empty"],
      });

      expect(() => {
        new User({
          name: "paulo",
          email: "email@example.com",
          password: 5 as any,
        });
      }).containsErrorMessages({
        password: [
          "password must be a string",
          "password must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new User({
          name: "herlander",
          email: "email@example.com",
          password: "password".repeat(256),
        });
      }).containsErrorMessages({
        password: ["password must be shorter than or equal to 255 characters"],
      });
    });
  });
});
