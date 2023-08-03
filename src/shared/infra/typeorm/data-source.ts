import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: false,
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
});

export function createConnection(
  host = process.env.DATABASE_HOST
): Promise<DataSource> {
  console.log(`Connecting to database on ${host}`);
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
