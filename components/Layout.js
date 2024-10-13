import {
  Heart,
  HomeIcon,
  MessageCircleIcon,
  PersonStanding,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  return (
    <div
      className="bg-blue-600 fixed bottom-0 left-0 w-full h-20 mb-0 flex justify-between
       items-center px-5 mt-auto"
    >
      <Link href={"/"} className="text-white flex flex-col  items-center">
        <HomeIcon className="size-6" />
        <p className="text-xs">Home</p>
      </Link>
      <div className="text-white flex flex-col items-center">
        <Plus className="size-6" />
        <p className="text-xs">Services</p>
      </div>
      <div className="text-white flex flex-col items-center">
        <Heart className="size-6" />
        <p className="text-xs">Your health</p>
      </div>
      <div className="text-white flex flex-col items-center">
        <MessageCircleIcon className="size-6" />
        <p className="text-xs">Messages</p>
      </div>
      <Link
        href={"/follow-up"}
        className="text-white flex flex-col items-center"
      >
        <PersonStanding className="size-6" />
        <div className="flex">
          <p className="text-xs">Follow up</p>
          <div className="size-1 rounded-full bg-red-600"></div>
        </div>
      </Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="fixed flex w-full items-center p-5 space-x-8  h-16 bg-white shadow-md top-0 left-0">
      <Image alt={"NHS Logo"} src={"/images.png"} width={100} height={10} />
      <Link
        className="text-lg font-semibold text-neutral-900"
        href={"/dashboard"}
      >
        Dashboard
      </Link>
    </div>
  );
};

export default function Layout({ children }) {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <>
      {router.pathname.includes("/dashboard") ? (
        <Navbar />
      ) : null}
      <div className="w-full z-50 py-16 h-screen bg-white">
        {children}
      </div>
      {router.pathname.includes("/dashboard") ||
      router.pathname === "/registration" ? null : (
        <Footer />
      )}
    </>
  );
}
