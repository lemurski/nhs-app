import Image from "next/image";
import localFont from "next/font/local";
import {
  Heart,
  HomeIcon,
  MessageCircleIcon,
  PersonStanding,
  Plus,
} from "lucide-react";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex-col pt-20 flex w-full h-full bg-white`}
    >
      <div className="flex flex-col px-5">
        <Image src={'/images.png'} width={100} height={50}/>
        <h1 className="text-4xl mt-4 text-black font-bold">
          Good afternoon, <br /> John Doe{" "}
        </h1>
        <h2 className="text-black font-semibold mt-2">NHS Number: 782 652 789 543</h2>
      </div>

    </div>
  );
}
