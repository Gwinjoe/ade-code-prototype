import { initDB } from "./client";
import { ruleSchema, sessionSchema } from "./schema";

let collectionInstance: any = null;

export async function collectionsInstance() {
  // Protect against server-side execution
  if (typeof window === "undefined") {
    console.log("createTodoCollection: Not in browser, skipping");
    return null;
  }

  if (collectionInstance) {
    console.log("createTodoCollection: Returning existing collection");
    return collectionInstance;
  }

  try {
    console.log("createTodoCollection: Initializing database");
    const db = await initDB();

    if (!db) {
      console.error(
        "createTodoCollection: Database initialization returned null",
      );
      return null;
    }

    console.log("createTodoCollection: Adding collections");
    if (!db.rules && !db.session) {
      await db.addCollections({
        rules: { schema: ruleSchema },
        session: { schema: sessionSchema },
      });
      console.log("createTodoCollection: Collections added successfully");
    }

    // Return the RxDB collection directly
    collectionInstance = db;

    console.log("createTodoCollection: Collection created successfully");
    return collectionInstance;
  } catch (error) {
    console.error("createTodoCollection: Failed to create collection", error);
    throw error;
  }
}
