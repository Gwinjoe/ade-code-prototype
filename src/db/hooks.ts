import { useEffect, useState } from "react";
import { getDb } from "./index";
import type { Rule, Session } from "./types";

export function useRules(): Rule[] {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    let sub: any;
    getDb().then(({ adeCodeDB, sessionCollection, rulesCollection }) => {
      sub = adeCodeDB.rules.find().$.subscribe((docs: any[]) => {
        console.log("found rules");
        setRules(docs.map((d) => d.toJSON()));
      });
    });
    return () => sub?.unsubscribe();
  }, []);

  return rules;
}

export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let sub: any;
    getDb().then(({ adeCodeDB, sessionCollection, rulesCollection }) => {
      sub = adeCodeDB.session.findOne("current").$.subscribe((doc: any) => {
        console.log("session: ", doc);
        if (doc) setSession(doc.toJSON());
      });
    });
    return () => sub?.unsubscribe();
  }, []);

  return session;
}
