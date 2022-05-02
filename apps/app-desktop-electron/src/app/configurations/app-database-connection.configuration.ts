import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { dirname, join } from 'path';
import { Connection, ConnectionManager } from 'typeorm';
import { appSettingsDirectoryName } from '../constants/app.constant';

export class AppDatabaseConnectionConfiguration {
  public static async generate(): Promise<Connection> {
    const databasePath = join(homedir(), appSettingsDirectoryName, 'app-database.sqlite3');

    if (!existsSync(dirname(databasePath))) {
      mkdirSync(dirname(databasePath), { recursive: true });
    }

    const connection = new ConnectionManager().create({
      type: 'better-sqlite3',
      database: databasePath,
      entities: [],
      synchronize: true,
    });

    await connection.connect();

    return connection;
  }
}
