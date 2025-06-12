import "reflect-metadata"
import { DataSource } from "typeorm"
import { Board } from "./entity/Board"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Board],
    subscribers: [],
    migrations: [],
})

