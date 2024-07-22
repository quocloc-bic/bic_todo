import * as ExpoSQLite from 'expo-sqlite';

const DATABASE_NAME = 'db.db';

class SQLite {
  private db: ExpoSQLite.SQLiteDatabase;

  constructor(databaseName: string = DATABASE_NAME) {
    this.db = ExpoSQLite.openDatabaseSync(databaseName);
  }

  async run(
    sqlStatement: string,
    params?: ExpoSQLite.SQLiteBindParams,
  ): Promise<ExpoSQLite.SQLiteRunResult> {
    return this.db.runAsync(sqlStatement, params || []);
  }

  async getAll<T>(
    sqlStatement: string,
    params?: ExpoSQLite.SQLiteBindParams,
  ): Promise<T[]> {
    return this.db.getAllAsync(sqlStatement, params || []);
  }
}

export default SQLite;
