import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";
import { collectionsInstance } from "./collection";

const adeCodeDB = await collectionsInstance();
const rulesCollection = createCollection(
  rxdbCollectionOptions({
    rxCollection: adeCodeDB.rules,
    startSync: true,
  }),
);

const sessionCollection = createCollection(
  rxdbCollectionOptions({
    rxCollection: adeCodeDB.session,
    startSync: true,
  }),
);

export async function getDb() {
  const sessionCount = await adeCodeDB.session.count().exec();
  if (sessionCount === 0) {
    sessionCollection.insert({ id: "current", role: "none" });
  }

  const rulesCount = await adeCodeDB.rules.count().exec();
  if (rulesCount === 0) {
    rulesCollection.insert([
      {
        id: crypto.randomUUID(),
        label: "Keyword Swap",
        type: "keyword",
        enabled: true,
        trigger: "meeting",
        replacement: "coffee",
        meaning: "Urgent discussion",
      },
      {
        id: crypto.randomUUID(),
        label: "Ending Marker",
        type: "marker",
        enabled: true,
        marker: "-- noted",
        position: "start",
        meaning: "Message confirmed",
      },
      {
        id: crypto.randomUUID(),
        label: "Exact Phrase",
        type: "phrase",
        enabled: false,
        phrase: "All good",
        meaning: "Abort operation",
      },
    ]);
  }

  console.log(
    `These are the found collections and count from index.ts: ${rulesCollection.size} matches ${rulesCount}`,
  );
  return { adeCodeDB, sessionCollection, rulesCollection };
}
