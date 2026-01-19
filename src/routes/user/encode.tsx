import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getDb } from "../../db/index";
import { encodeMessage } from "../../lib/encodeDecode";
import { useRules } from "../../db/hooks";

export const UserEncode: React.FC = () => {
  const rules = useRules();
  const [input, setInput] = useState("");
  const [selectedRule, setSelectedRule] = useState(rules[0]?.id || "");
  const [output, setOutput] = useState("");

  const handleEncode = async () => {
    const encoded = await encodeMessage(input, selectedRule);
    setOutput(encoded);
  };

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-semibold text-lg">Encode Message</h2>
          <Input
            placeholder="Write a normal sentence"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="w-full border rounded p-2"
            value={selectedRule}
            onChange={(e) => setSelectedRule(e.target.value)}
          >
            {rules.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} {r.enabled ? "" : "(disabled)"}
              </option>
            ))}
          </select>
          <Button onClick={handleEncode}>Encode</Button>
          {output && (
            <div className="bg-muted p-4 rounded border">
              <strong>Encoded Message:</strong>
              <p>{output}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/user/encode")({
  component: UserEncode,
});
