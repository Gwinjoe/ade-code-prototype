import { removeRxDatabase } from "rxdb";
import { createRxDatabase, addRxPlugin } from "rxdb/plugins/core";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin);
}

let dbInstance: any = null;

export async function initDB() {
  // Only initialize in browser environment
  if (typeof window === "undefined") {
    console.log("initDB: Not in browser, skipping");
    return null;
  }

  if (dbInstance) {
    console.log("initDB: Returning existing instance");
    return dbInstance;
  }

  try {
    console.log("initDB: Creating new database instance");
    const storage = wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    });

    // Always remove existing database in development
    if (import.meta.env.DEV) {
      try {
        console.log("initDB: Removing existing database (dev mode)");
        await removeRxDatabase("appdb", storage);
      } catch (e) {
        console.log("initDB: No existing database to remove");
      }
    }

    dbInstance = await createRxDatabase({
      name: "adeCodeDB",
      storage,
      multiInstance: false,
      eventReduce: true,
    });

    console.log("initDB: Database created successfully");
    return dbInstance;
  } catch (error) {
    console.error("initDB: Failed to create database", error);
    throw error;
  }
}

// Cleanup for HMR
if (typeof window !== "undefined" && import.meta.hot) {
  import.meta.hot.dispose(async () => {
    console.log("HMR: Disposing database");
    if (dbInstance) {
      await dbInstance.destroy();
      dbInstance = null;
    }
  });
}
