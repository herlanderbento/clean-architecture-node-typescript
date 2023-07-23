import { DataTypes } from "sequelize";
import { setupSequelize } from "../../../../../@seedwork/infra/testing/helpers/db";
import { UserSequelize } from "../user-sequelize";

describe("UserModel unit tests", () => {
  setupSequelize({ models: [UserSequelize.UserModel] });

  test("mapping props", () => {
    const attributesMap = UserSequelize.UserModel.getAttributes();
    const attributes = Object.keys(attributesMap);

    expect(attributes).toStrictEqual([
      "id",
      "name",
      "email",
      "password",
      "created_at",
      "updated_at",
    ]);

    const idAtrr = attributesMap.id;
    expect(idAtrr).toMatchObject({
      field: "id",
      fieldName: "id",
      type: DataTypes.UUID(),
      primaryKey: true,
    });

    const nameAtrr = attributesMap.name;
    expect(nameAtrr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataTypes.STRING(255),
    });

    const emailAtrr = attributesMap.email;
    expect(emailAtrr).toMatchObject({
      field: "email",
      fieldName: "email",
      allowNull: false,
      type: DataTypes.STRING(255),
    });

    const passwordAtrr = attributesMap.password;
    expect(passwordAtrr).toMatchObject({
      field: "password",
      fieldName: "password",
      allowNull: false,
      type: DataTypes.STRING(255),
    });

    const updatedAtAtrr = attributesMap.updated_at;
    expect(updatedAtAtrr).toMatchObject({
      field: "updated_at",
      fieldName: "updated_at",
      allowNull: false,
      type: DataTypes.DATE(),
    });
  });

  test("create user", async () => {
    const arrange = {
      id: "883ae727-31e8-47ae-be70-b287c0f0387f",
      name: "user",
      email: "user@example.com",
      password: "password",
      created_at: new Date(),
      updated_at: new Date(),
    };
    const user = await UserSequelize.UserModel.create(arrange);
    expect(user.toJSON()).toStrictEqual(arrange);
  });
});
