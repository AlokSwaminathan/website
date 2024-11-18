"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import SignedInPfp from "../login/SignedInPfp";
import { UserProvider, useUser } from "../hooks/UserContext";

const links = [
  {
    name: "library",
    href: "/library",
  },
  {
    name: "guides",
    href: "/guides",
  },
  {
    name: "practice",
    href: "/practice",
  },
];

const Navbar = ({
  variant = "primary",
  className,
}: {
  variant?: "primary" | "secondary";
  className?: string;
}) => {
  const { user } = useUser();

  return (
    <>
      <div
        className={cn(
          "hidden w-full items-center justify-between pt-5 md:flex",
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            variant === "primary" && "grow basis-0",
          )}
        >
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </Link>
        </div>

        {variant === "primary" && (
          <div className="flex space-x-12">
            {links.map((link) => (
              <NavbarLink key={link.name} href={link.href}>
                {link.name}
              </NavbarLink>
            ))}
          </div>
        )}

        <div
          className={cn(
            "flex items-center justify-center space-x-8",
            variant === "primary" && "grow basis-0",
          )}
        >
          {user ? (
            <>
              <SignedInPfp />
            </>
          ) : (
            <>
              <NavbarLink href={"/signup"}>Sign up</NavbarLink>

              <Link href={"/login"}>
                <Button className="text-md px-5 py-3 font-semibold text-white">
                  Log in
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex w-full items-center justify-between px-8 py-7 md:hidden",
          className,
        )}
      >
        <div className="flex items-center justify-center">
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" width={75} height={75} />
          </Link>
        </div>

        <MobileNavbar />
      </div>
    </>
  );
};

const MobileNavbar = () => {
  const { user } = useUser();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="opacity-70" />
        </SheetTrigger>
        <SheetContent className="bg-primary-foreground">
          <SheetHeader>
            <SheetTitle className="flex w-full">
              {" "}
              <SheetTrigger asChild>
                <Link className="inline-block" href={"/"}>
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={75 * 1.35}
                    height={80 * 1.35}
                  />
                </Link>
              </SheetTrigger>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex flex-col gap-2">
            {links.map((link) => (
              <div key={link.name}>
                <SheetTrigger asChild>
                  <NavbarLink href={link.href} isMobile={true}>
                    {link.name}
                  </NavbarLink>
                </SheetTrigger>
              </div>
            ))}

            {user ? (
              <SignedInPfp />
            ) : (
              <>
                <div>
                  <NavbarLink href={"/signup"} isMobile={true}>
                    Sign up
                  </NavbarLink>
                </div>

                <Button className="text-md px-5 py-3 font-semibold text-white">
                  <Link href={"/login"}>Log in</Link>
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const NavbarLink = ({
  children,
  href,
  isMobile = false,
  className,
}: {
  children: React.ReactNode;
  href: string;
  isMobile?: boolean;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "capitalize opacity-70 transition-all ease-in-out hover:text-primary",
        !isMobile && "scale-100 hover:scale-105",
        className,
      )}
    >
      {children}
    </Link>
  );
};
export default Navbar;