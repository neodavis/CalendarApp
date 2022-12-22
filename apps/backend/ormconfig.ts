import { AbsenceEntity } from './src/app/absence/absence.entity';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "containers-us-west-140.railway.app",
    port: 6417,
    username: "postgres",
    password: "aoLm9QPEKhyYQZxVzOtM",
    database: "railway",
    synchronize: true,
    entities: [AbsenceEntity],
}

export default config;

