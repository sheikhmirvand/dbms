import mysql, { Connection } from "mysql2";
import { IDbinput, IUserAndDatabaseInfo } from "../types/types";
import { Pool } from "mysql2/typings/mysql/lib/Pool";

export class Db {
  private static db: Db;
  private pool: Pool | Connection;
  private userAneDatabaseInfo: IUserAndDatabaseInfo;

  constructor() {}

  public static getDb(): Db {
    if (!Db.db) {
      Db.db = new Db();
    }

    return Db.db;
  }

  public async getConnectrion({ password, port, user }: IDbinput) {
    try {
      this.userAneDatabaseInfo = {
        password,
        port,
        user,
      };
      this.pool = mysql.createPool({ host: "127.0.0.1", password, user, port });
    } catch (error) {
      console.log(error);
    }
  }

  public setDatabase(database: string) {
    try {
      this.pool = mysql.createConnection({
        host: "127.0.0.1",
        password: this.userAneDatabaseInfo.password,
        user: this.userAneDatabaseInfo.user,
        database: database,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return error;
      }
    }
  }

  public query(sql: string) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
