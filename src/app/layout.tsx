import "~/styles/globals.css";

import { Inter, Racing_Sans_One } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { placeJsonLd, localBusinessJsonLd } from "~/lib/constants";

import { TRPCReactProvider } from "~/trpc/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { Facebook, Phone } from "lucide-react";

import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"], // specify the subsets you want to use
  weight: ["400"], // specify the weights you want to use
});

export const metadata = {
  title: "United Auto",
  description:
    "At United Auto Sales & Service in Waterbury, CT, we offer quality automotive services and repairs by highly trained technicians. Visit us for excellent service",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KWHQB96W" />
      <body className={`font-sans ${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <div className="flex h-screen flex-col justify-between">
          <div className="hidden justify-center bg-neutral-800 pt-0.5 text-xs text-white sm:py-1 md:block lg:text-sm">
            <div className="flex items-center justify-evenly ">
              <div>OPEN TODAY! SALES: 8:30AM-5PM</div>
              <div>
                SALES:{"  "}
                <a className="font-bold underline" href="tel:203-437-8805">
                  203-756-8851
                </a>
              </div>
              <div>
                219 CONGRESS AVE, WATERBURY, CT 06708{"  "}
                <span className="font-bold underline">Get Directions</span>
              </div>
            </div>
            {/* <div className="flex items-center justify-evenly  md:hidden"> */}
            {/*   Welcome to United Auto */}
            {/* </div> */}
          </div>
          <header className="flex items-center justify-between bg-background px-4 py-3 shadow-sm md:px-6 md:py-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Image
                src="/images/united-auto-logo.jpg"
                priority={true}
                width={115}
                height={115}
                alt="United Auto Logo"
              />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex transform cursor-pointer border-y-2 border-black font-black font-bold transition duration-500 ease-in-out hover:-translate-y-0.5  md:hidden">
                  Menu
                </button>
              </SheetTrigger>
              {/* TODO: Adjust size of sheet using tailwind css mainly mobile */}
              <SheetContent>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 font-semibold underline underline-offset-2">
                  <SheetClose asChild>
                    <Link href="/service">
                      <div className="grid hidden grid-cols-4 items-center gap-4">
                        Service
                      </div>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/inventory">
                      <div className="grid grid-cols-4 items-center gap-4">
                        Inventory
                      </div>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/emissions">
                      <div className="grid hidden grid-cols-4 items-center gap-4">
                        Emissions
                      </div>
                    </Link>
                  </SheetClose>
                </div>
                <SheetFooter>
                  <SheetClose asChild></SheetClose>
                </SheetFooter>
              </SheetContent>{" "}
            </Sheet>
            <Menubar className="hidden md:flex">
              <MenubarMenu>
                {/* TODO: On link hover make hover button show up */}
                <Link href="/service" legacyBehavior passHref>
                  <MenubarTrigger className="hidden text-base">
                    Service
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                {/* TODO: On link hover make hover button show up */}
                <Link href="/inventory" legacyBehavior passHref>
                  <MenubarTrigger className="text-base">
                    Inventory
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link href="/emissions" legacyBehavior passHref>
                  <MenubarTrigger className="hidden text-base">
                    Emissions
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="hidden text-base">
                  About
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>About Us</MenubarItem>
                  <MenubarItem>Contact Us</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </header>

          <div className="flex-1">
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </div>

          <Link
            aria-label="Go to facebook page"
            href="tel:(203)756-8851"
            className="fixed bottom-0 right-0 flex"
          >
            <Phone
              size={60}
              strokeWidth={1.5}
              className="mb-6 mr-4 rounded-full border-2 border-black bg-green-500 fill-white text-green-500 sm:hidden"
            />
          </Link>
          <footer className="flex items-center justify-evenly gap-2 pb-5 text-xs md:text-base">
            <Link
              aria-label="Go to facebook page"
              href="https://www.facebook.com/UnitedAutoWaterbury/"
            >
              <Facebook
                size={48}
                strokeWidth={1.5}
                className="rounded border border-blue-500 bg-blue-500 fill-white text-blue-500"
              />
            </Link>
            <div>
              {/* //TODO: Update this below to be sitemap page and just put down every link */}
              <Link href="/sitemap">Sitemap</Link>
              {" | "}
              <Link href="/privacy-policy">Privacy Policy</Link>
              {" | "}
              <Link href="/terms-of-use">Terms of Use</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
