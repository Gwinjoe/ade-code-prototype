import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { decodeMessage } from "../../lib/encodeDecode";

export const UserDecode: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    meaning: string;
    decodedMessage: string;
    originalMessage: string;
  } | null>(null);

  const handleDecode = async () => {
    const decoded = await decodeMessage(input);
    setResult(decoded);
  };

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-semibold text-lg">Decode Message</h2>
          <Input
            placeholder="Paste coded message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleDecode}>Decode</Button>
          {result && (
            <div className="bg-muted p-4 rounded border">
              <p>
                <strong>Hidden Meaning:</strong> {result.meaning}
              </p>
              <p>
                <strong>Decoded Message</strong> {result.decodedMessage}
              </p>
              <p>
                <strong>Original Message</strong> {result.originalMessage}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/user/decode")({
  component: UserDecode,
});
