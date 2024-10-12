import { Heart, HomeIcon, MessageCircleIcon, PersonStanding, Plus } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="w-full z-50 h-screen max-h-screen bg-white">
      {children}
      <div
        className="bg-blue-600 fixed bottom-0 left-0 w-full h-20 mb-0 flex justify-between
       items-center px-10 mt-auto"
      >
        <Link href={'/'} className="text-white flex flex-col  items-center">
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
          <p className="text-xs">Follow up</p>
        </Link>
      </div>
    </div>
  );
}
