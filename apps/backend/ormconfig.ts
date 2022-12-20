import { AbsenceEntity } from './src/app/entities/absence.entity';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "qwerty",
    database: "absence_db",
    synchronize: true,
    entities: [AbsenceEntity],
}

export default config;

