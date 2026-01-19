export type RuleType = "keyword" | "marker" | "phrase";

export interface Rule {
  id: string;
  label: string;
  type: RuleType;
  enabled: boolean;
  trigger?: string;
  replacement?: string;
  marker?: string;
  phrase?: string;
  meaning: string;
}

export interface Session {
  id: string;
  role: "admin" | "user" | "none";
}
