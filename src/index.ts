import { Elysia, t } from "elysia";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { db } from "./core/db/db";
import { usersRepository } from "./repositories/users.repository";
import { settingsRepository } from "./repositories/settings.repository";
import swagger from "@elysiajs/swagger";

await migrate(db, { migrationsFolder: "./drizzle" });

const port = +(process.env.PORT || 3000);

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .group("/api", (api) =>
    api
      .get("/user/:id", ({ params: { id } }) => usersRepository.isUserExist(id))
      .post("/user", ({ body }) => usersRepository.createUser(body.id), {
        body: t.Object({ id: t.String({ minLength: 3 }) }),
      })
      .get("/settings/:userId", ({ params: { userId } }) => {
        return settingsRepository.getSettings(userId);
      })
      .post(
        "/settings/",
        ({ body }) =>
          settingsRepository.updateSettings(body.userId, body.settings),
        {
          body: t.Object({
            userId: t.String(),
            settings: t.Record(t.String(), t.Any(), { minProperties: 1 }),
          }),
        }
      )
  )
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
