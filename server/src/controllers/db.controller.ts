import { Request, Response } from "express";
import { Db } from "../db/Db";
import { IDbinput } from "../types/types";
import dbRepository from "../repository/db.repository";

class DbController {
  async connectDb(req: Request, res: Response) {
    const { password, port, user }: IDbinput = req.body;

    const db = Db.getDb();
    db.getConnectrion({ password, port, user });
    res.status(200).json("ok");
  }

  async getAllDb(req: Request, res: Response) {
    try {
      const result = await dbRepository.showAllDatabase();
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: error.message,
        });
      }
    }
  }

  async setDatabase(req: Request, res: Response) {
    try {
      const name: string = req.params.name;

      const db = Db.getDb();
      db.setDatabase(name);
      const tables = await dbRepository.showTables();
      res.json(tables);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: error.message,
        });
      }
    }
  }

  async getQuery(req: Request, res: Response) {
    try {
      const { query } = req.body;

      const result = await dbRepository.query(query);

      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: error.message,
        });
      }
    }
  }

  async getTable(req: Request, res: Response) {
    try {
      const { table } = req.params;
      if (!table)
        return res.status(400).json({
          message: "table is required",
        });
      const result = await dbRepository.getTable(table);

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: error.message,
        });
      }
    }
  }

  async deletTable(req: Request, res: Response) {
    try {
      const { table } = req.params;
      if (!table)
        return res.status(400).json({
          message: "table is required",
        });

      const result = await dbRepository.deletTable(table);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: error.message,
        });
      }
    }
  }
}

const dbController = new DbController();
export default dbController;
