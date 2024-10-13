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
import useUser from "@/components/hooks/useUser";

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


  const { data, isPending } = useUser();


  if (isPending) {
    return null
  }

  console.log(data)

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex-col pt-20 flex w-full h-full bg-white`}
    >
      <div className="flex flex-col px-5">
        <Image alt={'NHS Logo'} src={"/images.png"} width={100} height={50} />
        <h1 className="text-4xl mt-4 text-black font-bold">
          Good afternoon, <br /> {data.First_Name} {data.Last_Name}{" "}
        </h1>
        <h2 className="text-black font-semibold mt-2">
          NHS Number: {data.NHS_id  }
        </h2>
      </div>
    </div>
  );
}
