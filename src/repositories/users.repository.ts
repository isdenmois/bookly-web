import { eq } from "drizzle-orm";
import { db, users } from "../core/db";

export const usersRepository = {
  async isUserExist(id: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .execute();

    return result.length > 0;
  },
  async createUser(id: string) {
    await db.insert(users).values({ id: id });

    return { id };
  },
};
