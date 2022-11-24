import {Sequelize} from "sequelize";
import Note from "../models/note";
import User from "../models/user";

export default class DB {
  private static sequelize: Sequelize;

  public static async init(
    db_host: string,
    db_port: string,
    db_name: string,
    db_user: string,
    db_pass: string
  ) {
    DB.sequelize = new Sequelize(
      `postgres://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`
    );
    DB.initModels();
    await DB.sequelize.sync();
  }

  private static initModels() {
    User.initModel(DB.sequelize);
    Note.initModel(DB.sequelize);
  }

  public static getSequelize() {
    return DB.sequelize;
  }
}
