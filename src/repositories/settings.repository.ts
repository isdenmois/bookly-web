import { eq } from "drizzle-orm";
import { db, settings } from "../core/db";

export const settingsRepository = {
  async getSettings(userId: string) {
    return (
      (await db.select().from(settings).where(eq(settings.userId, userId)).get()
        ?.settings) ?? {}
    );
  },
  async updateSettings(userId: string, newSettings: unknown) {
    await db
      .insert(settings)
      .values({ userId: userId, settings: newSettings })
      .onConflictDoUpdate({
        target: settings.userId,
        set: { settings: newSettings },
      });

    return settingsRepository.getSettings(userId);
  },
};
