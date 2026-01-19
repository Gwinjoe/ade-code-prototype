import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const UserTraining: React.FC = () => {
  const examples = [
    { input: "We have a meeting", output: "We have a coffee" },
    { input: "All good", output: "Abort operation" },
  ];

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="font-semibold text-lg">What is Ade Code?</h2>
          <p>
            Ade Code allows you to encode messages using predefined rules and
            decode hidden meanings.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="font-semibold text-lg">How Encoding Works</h2>
          <p>
            You write a normal sentence, select a rule, and the encoded message
            is generated.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="font-semibold text-lg">Examples</h2>
          {examples.map((e, i) => (
            <p key={i}>
              "{e.input}" → "{e.output}"
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/user/training")({
  component: UserTraining,
});
