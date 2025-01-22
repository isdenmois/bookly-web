import { Elysia, t } from "elysia";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { db } from "./core/db/db";
import { usersRepository } from "./repositories/users.repository";

await migrate(db, { migrationsFolder: "./drizzle" });

const port = +(process.env.PORT || 3000);

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/api/user/:id", ({ params: { id } }) => usersRepository.isUserExist(id))
  .post("/api/user", ({ body }) => usersRepository.createUser(body.id), {
    body: t.Object({ id: t.String({ minLength: 3 }) }),
  })
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
