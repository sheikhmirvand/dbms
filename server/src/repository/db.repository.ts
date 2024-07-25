import { Db } from "../db/Db";

class DbRepository {
  async showTables() {
    try {
      const db = Db.getDb();
      const result = await db.query("SHOW TABLES;");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async showAllDatabase() {
    const db = Db.getDb();
    const result = await db.query("SHOW DATABASES;");
    return result;
  }

  async query(query: string) {
    const db = Db.getDb();
    const result = await db.query(query);
    return result;
  }

  async getTable(table: string) {
    const db = Db.getDb();

    const result = db.query(`SELECT * FROM ${table}`);
    return result;
  }

  async deletTable(table: string) {
    const db = Db.getDb();

    const result = db.query(`DROP TABLE ${table}`);
    return result;
  }
}

const dbRepository = new DbRepository();
export default dbRepository;
