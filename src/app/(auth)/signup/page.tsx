"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      // Start the sign up process
      await signUp.create({
        emailAddress,
        password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      toast({
        title: "Check your email",
        description: "We've sent you a verification code.",
      });
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string }> };
      toast({
        title: "Error",
        description: error?.errors?.[0]?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        throw new Error("Unable to verify email address.");
      }
      
      if (completeSignUp.status === "complete") {
        await router.push("/dashboard");
        toast({
          title: "Success",
          description: "Your account has been created.",
        });
      }
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string }> };
      toast({
        title: "Error",
        description: error?.errors?.[0]?.message || "Invalid verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (pendingVerification) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a verification code to {emailAddress}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleVerification}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  disabled={isLoading}
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up with Email"
              )}
            </Button>
          </CardContent>
        </form>

        <div className="relative px-6 py-2">
          <div className="absolute inset-0 flex items-center px-6">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <CardContent className="grid grid-cols-2 gap-4 p-6">
          <Button
            variant="outline"
            onClick={() => {
              if (!signUp) return;
              signUp.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/dashboard",
              });
            }}
            disabled={isLoading || !signUp}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (!signUp) return;
              signUp.authenticateWithRedirect({
                strategy: "oauth_github",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/dashboard",
              });
            }}
            disabled={isLoading || !signUp}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
