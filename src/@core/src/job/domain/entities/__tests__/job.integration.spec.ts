import { Job } from "../job";

describe("Category Integration tests", () => {
  describe("create method", () => {
    it("should a invalid job using name property", () => {
      expect(() => {
        new Job({
          name: null,
        });
      }).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new Job({
          name: "",
        });
      }).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => {
        new Job({
          name: 5 as any,
        });
      }).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(
        () =>
          new Job({
            name: "t".repeat(256),
          })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid job using description property", () => {
      expect(() => {
        new Job({
          name: "Movie",
          description: 5 as any,
        });
      }).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a invalid job using is_active property", () => {
      expect(() => {
        new Job({
          name: "Movie",
          is_active: "" as any,
        });
      }).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("should a valid job", () => {
      expect.assertions(0);
      new Job({ name: "Movie" });
      new Job({ name: "Movie", description: "some description" });
      new Job({ name: "Movie", description: null });
      new Job({
        name: "Movie",
        description: "some description",
        is_active: false,
      });
      new Job({
        name: "Movie",
        description: "some description",
        is_active: true,
      });
    });
  });
  describe("update method", () => {
    it("should a invalid job using name property", () => {
      const job = new Job({ name: "Movie" });
      expect(() => job.update(null, null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => job.update("", null)).containsErrorMessages({
        name: ["name should not be empty"],
      });
      expect(() => job.update(5 as any, null)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      expect(() =>
        job.update("t".repeat(256), null)
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });
    it("should a invalid job using description property", () => {
      const job = new Job({ name: "Movie" });
      expect(() => job.update("Movie", 5 as any)).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a valid job", () => {
      expect.assertions(0);
      const job = new Job({ name: "Movie" });
      job.update("name changed", null);
      job.update("name changed", "some description");
    });
  });
});
