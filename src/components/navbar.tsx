"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserProfileDropdown } from "@/components/user-profile-dropdown";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 hidden md:flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">TaskMaster</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/tasks"
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  Tasks
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  About
                </Link>
              </SignedOut>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-bold text-xl">TaskMaster</span>
                </Link>
                <div className="flex flex-col space-y-3 mt-4">
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground/60 transition-colors hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/tasks"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground/60 transition-colors hover:text-foreground"
                    >
                      Tasks
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground/60 transition-colors hover:text-foreground"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground/60 transition-colors hover:text-foreground"
                    >
                      About
                    </Link>
                  </SignedOut>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center md:hidden">
              <span className="font-bold text-xl">TaskMaster</span>
            </Link>
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserProfileDropdown />
          </SignedIn>
          <SignedOut>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Sign in
              </Button>
              <Button onClick={() => router.push("/signup")}>Sign up</Button>
            </div>

            {/* Mobile Right Side */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" className="h-8 w-8 px-0">
                  <span className="sr-only">Open menu</span>
                  <div className="h-0.5 w-4 bg-current" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </SignInButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup" className="w-full">
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
