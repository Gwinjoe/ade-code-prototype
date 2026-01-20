export type RuleType = "keyword" | "marker" | "phrase";
export type MarkerPosition = "start" | "end";

export interface Rule {
  id: string;
  label: string;
  type: RuleType;
  enabled: boolean;

  // keyword
  trigger?: string;
  replacement?: string;

  // marker
  marker?: string;
  position?: MarkerPosition;

  // phrase
  phrase?: string;

  meaning: string;
}
export interface Session {
  id: string;
  role: "admin" | "user" | "none";
}
