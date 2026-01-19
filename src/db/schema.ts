import type { RxJsonSchema } from "rxdb";
import type { Rule, Session } from "./types";

export const ruleSchema: RxJsonSchema<Rule> = {
  title: "rule schema",
  version: 0,
  description: "Encoding/decoding rules",
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 200 },
    label: { type: "string" },
    type: { type: "string" },
    enabled: { type: "boolean" },
    trigger: { type: "string" },
    replacement: { type: "string" },
    marker: { type: "string" },
    phrase: { type: "string" },
    meaning: { type: "string" },
  },
  required: ["id", "label", "type", "enabled", "meaning"],
};

export const sessionSchema: RxJsonSchema<Session> = {
  title: "session schema",
  version: 0,
  description: "Current user session",
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 200 },
    role: { type: "string" },
  },
  required: ["id", "role"],
};

// export interface Rule {
//   id: string;
//   label: string;
//   type: "keyword" | "marker" | "phrase";
//   enabled: boolean;
//   trigger?: string;
//   replacement?: string;
//   marker?: string;
//   position?: "start" | "end";
//   phrase?: string;
//   meaning: string;
// }
//
// export const RuleJsonSchema = {
//   title: "Rule",
//   type: "object",
//   version: 0,
//   primaryKey: "id",
//   required: ["id", "label", "type", "enabled", "meaning"],
//   properties: {
//     id: {
//       type: "string",
//       description: "A unique identifier for the rule.",
//     },
//     label: {
//       type: "string",
//       description: "A human-readable label for the rule.",
//     },
//     type: {
//       type: "string",
//       description: "The type of the rule.",
//       enum: ["keyword", "marker", "phrase"],
//     },
//     enabled: {
//       type: "boolean",
//       description: "Whether the rule is currently enabled.",
//     },
//     trigger: {
//       type: "string",
//       description:
//         "The specific string that triggers the rule (for 'keyword' type).",
//     },
//     replacement: {
//       type: "string",
//       description:
//         "The replacement string used when the rule is triggered (for 'keyword' or 'marker' types).",
//     },
//     marker: {
//       type: "string",
//       description:
//         "The character or string used as a marker (for 'marker' type).",
//     },
//     position: {
//       type: "string",
//       description:
//         "The position of the marker relative to the text (for 'marker' type).",
//       enum: ["start", "end"],
//     },
//     phrase: {
//       type: "string",
//       description: "The specific phrase for the rule (for 'phrase' type).",
//     },
//     meaning: {
//       type: "string",
//       description: "A description of the meaning or purpose of the rule.",
//     },
//   },
//   allOf: [
//     {
//       if: {
//         properties: {
//           type: {
//             const: "keyword",
//           },
//         },
//       },
//       then: {
//         required: ["trigger", "replacement"],
//       },
//     },
//     {
//       if: {
//         properties: {
//           type: {
//             const: "marker",
//           },
//         },
//       },
//       then: {
//         required: ["marker", "position"],
//       },
//     },
//     {
//       if: {
//         properties: {
//           type: {
//             const: "phrase",
//           },
//         },
//       },
//       then: {
//         required: ["phrase"],
//       },
//     },
//   ],
// };
