import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRules } from "@/db/hooks";
import { getDb } from "@/db";
import type { Rule, RuleType } from "@/db/types";

export function AdminRules() {
  const rules = useRules();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [meaning, setMeaning] = useState("");
  const [type, setType] = useState<RuleType>("keyword");
  const [trigger, setTrigger] = useState("");
  const [replacement, setReplacement] = useState("");
  const [marker, setMarker] = useState("");
  const [position, setPosition] = useState<"start" | "end">("end");
  const [phrase, setPhrase] = useState("");

  // Debug: Log current state
  useEffect(() => {
    console.log("Current rules in component:", rules.length);
    console.log(
      "Rule IDs:",
      rules.map((r) => r.id),
    );
  }, [rules]);

  const resetForm = () => {
    setEditingId(null);
    setLabel("");
    setMeaning("");
    setType("keyword");
    setTrigger("");
    setReplacement("");
    setMarker("");
    setPosition("end");
    setPhrase("");
  };

  const startEdit = (rule: Rule) => {
    setEditingId(rule.id);
    setLabel(rule.label);
    setMeaning(rule.meaning);
    setType(rule.type);
    setTrigger(rule.trigger ?? "");
    setReplacement(rule.replacement ?? "");
    setMarker(rule.marker ?? "");
    setPosition(rule.position ?? "end");
    setPhrase(rule.phrase ?? "");
  };

  const saveRule = async () => {
    try {
      const { rulesCollection } = await getDb();

      const ruleData = {
        label,
        meaning,
        type,
        enabled: true,
        trigger: type === "keyword" ? trigger : undefined,
        replacement: type === "keyword" ? replacement : undefined,
        marker: type === "marker" ? marker : undefined,
        position: type === "marker" ? position : undefined,
        phrase: type === "phrase" ? phrase : undefined,
      };

      if (editingId) {
        // Check if rule exists in TanStack DB
        const exists = rulesCollection.has(editingId);
        console.log(
          "Updating rule:",
          editingId,
          "Exists in TanStack DB:",
          exists,
        );

        if (exists) {
          rulesCollection.update(editingId, (data) => {
            console.log("rule data: ", ruleData);
            ruleData.label && (data.label = ruleData.label);
            ruleData.meaning && (data.meaning = ruleData.meaning);
            ruleData.trigger && (data.trigger = ruleData.trigger);
            ruleData.replacement && (data.replacement = ruleData.replacement);
            ruleData.marker && (data.marker = ruleData.marker);
            ruleData.position && (data.position = ruleData.position);
            ruleData.phrase && (data.phrase = ruleData.phrase);
          });
        } else {
          console.log("Rule not found, inserting instead");
          rulesCollection.insert({
            id: editingId,
            ...ruleData,
          });
        }
      } else {
        const newId = crypto.randomUUID();
        console.log("Inserting new rule with ID:", newId);
        rulesCollection.insert({
          id: newId,
          ...ruleData,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving rule:", error);
    }
  };

  const toggleRule = async (id: string, enabled: boolean) => {
    try {
      const { rulesCollection } = await getDb();

      console.log("Toggling rule:", id, "to", enabled);
      if (rulesCollection.has(id)) {
        rulesCollection.update(id, (doc) => {
          doc.enabled = enabled;
        });
      }
      // } else {
      //   console.error(`Rule ${id} not found in TanStack DB collection!`);
      //   // Fallback to direct RxDB update
      //   const { adeCodeDB } = await getDb();
      //   const doc = await adeCodeDB.rules.findOne(id).exec();
      //   if (doc) {
      //     await doc.update({
      //       $set: { enabled },
      //     });
      //     // Sync back to TanStack DB
      //     const updatedRule = doc.toJSON();
      //     rulesCollection.update(id, updatedRule);
      //   }
      // }
    } catch (error) {
      console.error("Error toggling rule:", error);
    }
  };

  const deleteRule = async (id: string) => {
    try {
      const { rulesCollection } = await getDb();
      rulesCollection.delete(id);
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  // Debug function
  const debugDbState = async () => {
    const { adeCodeDB, rulesCollection } = await getDb();
    const rxdbRules = await adeCodeDB.rules.find().exec();
    const tsdbRules = Array.from(rulesCollection.values());

    console.log("=== DEBUG DB STATE ===");
    console.log("RxDB rules:", rxdbRules.length);
    console.log("TanStack DB rules:", tsdbRules.length);
    console.log(
      "RxDB IDs:",
      rxdbRules.map((r) => r.id),
    );
    console.log(
      "TanStack DB IDs:",
      tsdbRules.map((r) => r.id),
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Debug Section */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-amber-800">Database Debug</h3>
              <p className="text-sm text-amber-600">
                Rules: {rules.length} | Editing: {editingId ? "Yes" : "No"}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={debugDbState}>
              Check DB State
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create / Edit Form */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-lg font-semibold">
            {editingId
              ? `Edit Rule: ${editingId.substring(0, 8)}...`
              : "Create Rule"}
          </h2>

          <Input
            placeholder="Rule label (human readable)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <Input
            placeholder="Hidden meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />

          <div className="space-y-1">
            <Label>Rule Type</Label>
            <select
              className="border rounded p-2 w-full"
              value={type}
              onChange={(e) => setType(e.target.value as RuleType)}
            >
              <option value="keyword">Keyword Swap</option>
              <option value="marker">Marker</option>
              <option value="phrase">Exact Phrase</option>
            </select>
          </div>

          {type === "keyword" && (
            <>
              <Input
                placeholder="Trigger word"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
              />
              <Input
                placeholder="Replacement word"
                value={replacement}
                onChange={(e) => setReplacement(e.target.value)}
              />
            </>
          )}

          {type === "marker" && (
            <>
              <Input
                placeholder="Marker (e.g. -- noted)"
                value={marker}
                onChange={(e) => setMarker(e.target.value)}
              />
              <select
                className="border rounded p-2 w-full"
                value={position}
                onChange={(e) => setPosition(e.target.value as "start" | "end")}
              >
                <option value="start">Start</option>
                <option value="end">End</option>
              </select>
            </>
          )}

          {type === "phrase" && (
            <Input
              placeholder="Exact phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          )}

          <div className="flex gap-2">
            <Button onClick={saveRule}>
              {editingId ? "Update Rule" : "Add Rule"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Existing Rules */}
      {rules.length === 0 ? (
        <Card>
          <CardContent className="text-center p-8">
            <p className="text-muted-foreground">
              No rules found. Try clicking "Check DB State" above.
            </p>
          </CardContent>
        </Card>
      ) : (
        rules.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div className="space-y-1">
                <div className="font-semibold">{r.label}</div>
                <div className="text-sm text-muted-foreground">{r.meaning}</div>
                <div className="text-xs text-muted-foreground">
                  {r.id.substring(0, 8)}... • {r.type} •{" "}
                  {r.enabled ? "✅ Enabled" : "❌ Disabled"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={r.enabled}
                  onCheckedChange={(v) => toggleRule(r.id, v)}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(r)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteRule(r.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export const Route = createFileRoute("/admin/rules")({
  component: AdminRules,
});
