import { getDb } from "../db/index";
import type { Rule } from "../db/types";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function encodeMessage(input: string, ruleId: string) {
  const { adeCodeDB } = await getDb();
  const rule = await adeCodeDB.rules.findOne(ruleId).exec();

  if (!rule || !rule.enabled) return input;

  switch (rule.type) {
    case "keyword": {
      if (!rule.trigger || !rule.replacement) return input;
      const pattern = new RegExp(`\\b${escapeRegExp(rule.trigger)}\\b`, "gi");
      return input.replace(pattern, rule.replacement);
    }

    case "marker": {
      if (!rule.marker) return input;
      return `${input.trim()} ${rule.marker}`;
    }

    case "phrase": {
      return rule.phrase ?? input;
    }

    default:
      return input;
  }
}

export async function decodeMessage(input: string): Promise<{
  meaning: string;
  decodedMessage: string;
  originalMessage: string;
}> {
  const { adeCodeDB } = await getDb();
  const rules: Rule[] = (await adeCodeDB.rules.find().exec()).map((r) =>
    r.toJSON(),
  );

  const normalized = input.trim();

  // Phrase rules first (exact match)
  for (const rule of rules) {
    if (rule.enabled && rule.type === "phrase" && rule.phrase === normalized) {
      return {
        meaning: rule.meaning || "Hidden message",
        decodedMessage: rule.meaning || normalized,
        originalMessage: normalized,
      };
    }
  }

  // Marker rules (ends with marker)
  for (const rule of rules) {
    if (
      rule.enabled &&
      rule.type === "marker" &&
      rule.marker &&
      normalized.endsWith(` ${rule.marker}`)
    ) {
      const originalMessage = normalized.slice(
        0,
        normalized.length - rule.marker.length - 1,
      );
      return {
        meaning: rule.meaning || "Marked message",
        decodedMessage: originalMessage,
        originalMessage: normalized,
      };
    }
  }

  // Keyword rules (word replacements)
  for (const rule of rules) {
    if (
      rule.enabled &&
      rule.type === "keyword" &&
      rule.trigger &&
      rule.replacement
    ) {
      const pattern = new RegExp(
        `\\b${escapeRegExp(rule.replacement)}\\b`,
        "gi",
      );
      if (pattern.test(normalized)) {
        const originalMessage = normalized.replace(pattern, rule.trigger);
        return {
          meaning: rule.meaning || "Contains coded words",
          decodedMessage: originalMessage,
          originalMessage: normalized,
        };
      }
    }
  }

  // No match found
  return {
    meaning: "No hidden meaning detected",
    decodedMessage: normalized,
    originalMessage: normalized,
  };
}
