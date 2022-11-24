import {INTEGER, Model, Sequelize, STRING} from "sequelize";
import User from "./user";

export default class Note extends Model {
  public id!: number;
  public note!: string;
  public userId!: number;

  public static initModel(initSeq: Sequelize) {
    Note.init(
      {
        id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        note: {
          type: STRING,
          allowNull: false,
        },
        userId: {
          type: INTEGER,
          references: {
            key: "id",
            model: User,
          },
        },
      },
      {
        sequelize: initSeq,
        tableName: "notes",
      }
    );
  }
}
