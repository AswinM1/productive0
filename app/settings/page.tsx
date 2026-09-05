"use client";

import { useState } from "react";
import { Copy, Check, Key, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TokenPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generateToken() {
    setLoading(true);
    setCopied(false);

    try {
      const response = await fetch("/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "VS Code",
        }),
      });

     

      const data = await response.json();

      setToken(data.token);
    } catch (error) {
      console.error(error);
      alert("Failed to generate token");
    } finally {
      setLoading(false);
    }
  }

  async function copyToken() {
    if (!token) return;

    await navigator.clipboard.writeText(token);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="size-5" />

            <CardTitle>
              Connect VS Code
            </CardTitle>
          </div>

          <CardDescription>
            Generate an API token and paste it into
            your Focus Tracker VS Code extension.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!token ? (
            <Button
              onClick={generateToken}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 size-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Key className="mr-2 size-4" />
                  Generate API Token
                </>
              )}
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Your API token
                </p>

                <div className="flex gap-2">
                  <Input
                    value={token}
                    readOnly
                    type="password"
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToken}
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4 text-sm">
                <p className="font-medium">
                  Next step
                </p>

                <p className="mt-1 text-muted-foreground">
                  Open VS Code and run:
                </p>

                <code className="mt-2 block rounded bg-muted p-2">
                  Focus Tracker: Set API Token
                </code>

                <p className="mt-2 text-muted-foreground">
                  Then paste the token above.
                </p>
              </div>

              <div className="rounded-lg border border-destructive/30 p-4 text-sm">
                <p className="font-medium">
                  Keep this token private
                </p>

                <p className="mt-1 text-muted-foreground">
                  This token gives your VS Code extension
                  access to send activity to your account.
                  It cannot be retrieved again after leaving
                  this page.
                </p>
              </div>

              <Button
                variant="outline"
                onClick={copyToken}
                className="w-full"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 size-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 size-4" />
                    Copy Token
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}