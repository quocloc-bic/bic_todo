import {
  openDatabase,
  SQLTransaction,
  SQLiteDatabase,
  SQLResultSet,
  SQLStatementArg,
} from 'expo-sqlite';

const DATABASE_NAME = 'db.db';

class SQLiteHelper {
  private static instance: SQLiteHelper | null = null;
  private db: SQLiteDatabase;

  constructor(databaseName: string) {
    this.db = openDatabase(databaseName);
  }

  static getInstance(): SQLiteHelper {
    if (!SQLiteHelper.instance) {
      SQLiteHelper.instance = new SQLiteHelper(DATABASE_NAME);
    }
    return SQLiteHelper.instance;
  }

  async execute(
    sqlStatement: string,
    args?: SQLStatementArg[] | undefined,
  ): Promise<SQLResultSet> {
    return new Promise((resolve, reject) => {
      this.db.transaction((transaction: SQLTransaction) => {
        transaction.executeSql(
          sqlStatement,
          args,
          (_, resultSet: SQLResultSet) => {
            resolve(resultSet);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }
}

export default SQLiteHelper;
