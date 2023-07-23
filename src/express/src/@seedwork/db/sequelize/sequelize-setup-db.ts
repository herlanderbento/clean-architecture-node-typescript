import { Sequelize } from "sequelize-typescript";
import { UserSequelize } from "@m27/the-food/src/user/infra";

export let sequelize: Sequelize;

export async function sequelizeSetupDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });

  sequelize.addModels([UserSequelize.UserModel]);
  await sequelize.sync();
}
