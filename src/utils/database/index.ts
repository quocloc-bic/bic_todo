import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'db.db';

class SQLiteHelper {
  private static instance: SQLiteHelper | null = null;
  private db: SQLite.SQLiteDatabase;

  constructor(databaseName: string) {
    this.db = SQLite.openDatabaseSync(databaseName);
  }

  static getInstance(): SQLiteHelper {
    if (!SQLiteHelper.instance) {
      SQLiteHelper.instance = new SQLiteHelper(DATABASE_NAME);
    }
    return SQLiteHelper.instance;
  }

  async execute(sqlStatement: string) {
    return this.db.execAsync(sqlStatement);
  }

  async run(
    sqlStatement: string,
    params: SQLite.SQLiteBindParams = [],
  ): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(sqlStatement, params);
  }

  async getAll<T>(
    sqlStatement: string,
    params: SQLite.SQLiteBindParams = [],
  ): Promise<T[]> {
    return this.db.getAllAsync(sqlStatement, params);
  }
}

export default SQLiteHelper;
