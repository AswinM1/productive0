"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Key,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ApiKey = {
  id: string;
  tokenPreview:string;
  createdAt: string;
  lastUsedAt?: string | null;
};

export default function TokenPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(true);



  /*
   * Load existing API keys
   */
  useEffect(() => {
    fetch("/api/tokens")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch API keys");
        }

        return res.json();
      })
      .then((data) => {
        setKeys(data);
      })
      .catch((error) => {
        console.error("Failed to load API keys:", error);
      })
      .finally(() => {
        setLoadingKeys(false);
      });
  }, []);

  /*
   * Generate token
   */
  async function generateToken() {
    setLoading(true);
    setCopied(false);
    setShowToken(true);

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

      if (!response.ok) {
        throw new Error("Failed to generate token");
      }

      const data = await response.json();

      setToken(data.token);

      /*
       * Refresh API key list
       */
      const keysResponse = await fetch("/api/tokens");

      if (keysResponse.ok) {
        const keysData = await keysResponse.json();
        setKeys(keysData);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate token");
    } finally {
      setLoading(false);
    }
  }

  /*
   * Copy token
   */
  async function copyToken() {
    if (!token) return;

    await navigator.clipboard.writeText(token);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

 

  async function revokeKey(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to revoke this API key?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/tokens/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to revoke API key");
      }

      setKeys((current) =>
        current.filter((key) => key.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to revoke API key");
    }
  }

  function formatDate(date?: string | null) {
    if (!date) return "Never";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-8 md:px-8 md:py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Developer settings
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Manage your API keys and connect Flowstate to your
            development environment.
          </p>
        </div>

        <div className="space-y-6">
          {/* VS Code Connection */}
          <Card className="border-neutral-200 shadow-none">
            <CardHeader className="border-b border-neutral-100">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Key className="size-4" />
                    VS Code
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Connect your VS Code extension to Flowstate.
                  </CardDescription>
                </div>
                </div>

              
            </CardHeader>

            <CardContent className="pt-6">
              {!token ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Connect your editor
                    </p>

                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      Generate a key and add it to the Flowstate
                      extension in VS Code.
                    </p>
                  </div>

                  <Button
                    onClick={generateToken}
                    disabled={loading}
                    className="shrink-0"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 size-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 size-4" />
                        Generate key
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Newly generated token */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium">
                        Your new API key
                      </p>

                      <span className="text-xs text-amber-600">
                        Copy it now
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          value={
                            showToken
                              ? token
                              : "••••••••••••••••••••••••"
                          }
                          readOnly
                          className="pr-10 font-mono text-xs"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowToken((value) => !value)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-900"
                        >
                          {showToken ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>

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

                  {/* Instructions */}
                  <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-sm font-medium text-neutral-900">
                      Connect VS Code
                    </p>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      Open the command palette with{" "}
                      <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-xs text-neutral-700">
                        Ctrl + Shift + P
                      </kbd>{" "}
                      and run:
                    </p>

                    <code className="mt-3 block rounded-md border border-neutral-200 bg-white px-3 py-2.5 font-mono text-xs text-neutral-700">
                      Flowstate: Set API Token
                    </code>
                  </div>

                  {/* Security */}
                  <p className="text-xs leading-5 text-neutral-400">
                    API keys can send activity to your Flowstate
                    account. Never share them publicly or commit
                    them to source control.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card className="border-neutral-200 shadow-none">
            <CardHeader className="border-b border-neutral-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    API keys
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Manage applications connected to your account.
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateToken}
                  disabled={loading}
                >
                  <Plus className="mr-2 size-4" />
                  New key
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {loadingKeys ? (
                <div className="flex h-32 items-center justify-center">
                  <p className="text-sm text-neutral-400">
                    Loading keys...
                  </p>
                </div>
              ) : keys.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Key className="mx-auto mb-3 size-5 text-neutral-300" />

                  <p className="text-sm font-medium text-neutral-900">
                    No API keys
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Generate a key to connect Flowstate to an
                    application.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {keys.map((key) => (
                    <div
  key={key.id}
  className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
>
  <div className="min-w-0">
    <div className="flex items-center gap-2">
      <p className="truncate font-mono text-sm font-medium text-neutral-900">
        {key.tokenPreview}
      </p>

      <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
        Active
      </span>
    </div>

    <div className="mt-1 flex gap-4 text-xs text-neutral-400">
      <span>
        Created {formatDate(key.createdAt)}
      </span>

      <span>
        Last used {formatDate(key.lastUsedAt)}
      </span>
    </div>
  </div>

  <Button
    variant="ghost"
    size="icon"
    onClick={() => revokeKey(key.id)}
    className="text-neutral-400 hover:text-red-600"
  >
    <Trash2 className="size-4" />
  </Button>
</div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Setup Guide */}
          <Card className="border-neutral-200 bg-neutral-50 shadow-none">
            <CardContent className="p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Using Flowstate with VS Code
                  </p>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-neutral-500">
                    Generate an API key, copy it, and configure
                    the Flowstate extension. Once connected, your
                    coding activity will automatically appear in
                    your dashboard.
                  </p>
                </div>

                <div className="shrink-0 text-xs font-medium text-blue-600">
                  3 steps
                </div>
              </div>

              <div className="mt-5 grid gap-4 border-t border-neutral-200 pt-5 md:grid-cols-3">
                <SetupStep
                  number="01"
                  title="Generate a key"
                />

                <SetupStep
                  number="02"
                  title="Add it to VS Code"
                />

                <SetupStep
                  number="03"
                  title="Start coding"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SetupStep({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-xs font-medium text-blue-600">
        {number}
      </span>

      <span className="text-sm text-neutral-700">
        {title}
      </span>
    </div>
  );
}