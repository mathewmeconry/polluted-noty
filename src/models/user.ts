import {INTEGER, Model, Sequelize, STRING} from "sequelize";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export default class User extends Model {
  public id!: number;
  public role?: UserRole;
  public username!: string;
  public password!: string;

  public static initModel(initSeq: Sequelize) {
    User.init(
      {
        id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        role: {
          type: STRING,
          allowNull: false,
          defaultValue: UserRole.USER,
        },
        username: {
          type: STRING,
          allowNull: false,
        },
        password: {
          type: STRING,
          allowNull: false,
        },
      },
      {
        sequelize: initSeq,
        tableName: "users",
      }
    );
  }
}
