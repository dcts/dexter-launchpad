"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/racoon-head.png";
import { useAppDispatch } from "@/app/_hooks/hooks";
import { useEffect, useRef } from "react";
import { userSlice } from "@/app/_store/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const radixConnectButtonRef = useRef<HTMLElement | null>(null);

  // Reset state if user disconnects
  useEffect(() => {
    const handleDisconnect = () => {
      dispatch(userSlice.actions.reset());
    };
    const radixConnectButton = radixConnectButtonRef.current;
    if (radixConnectButton) {
      radixConnectButton.addEventListener("onDisconnect", handleDisconnect);
    }
    return () => {
      if (radixConnectButton) {
        radixConnectButton.removeEventListener(
          "onDisconnect",
          handleDisconnect
        );
      }
    };
  }, [dispatch]);

  // const { balances } = useAppSelector((state) => state.user);
  // const xrdBalance = balances[process.env.NEXT_PUBLIC_XRD_ADDRESS || ""] || -1;
  return (
    <header className="w-full h-full flex items-center justify-between px-8">
      <Link href="/" className="flex justify-center items-center relative">
        <Image
          alt="racoon head"
          src={logo}
          width={50}
          height={50}
          style={{ width: "auto", height: "auto" }}
          className="hover:animate-spin transition duration-1000"
        />
        <span className="font-title max-sm:mx-2 sm:mx-3 text-xl font-black tracking-wider">
          RADIX.MEME
        </span>
        <BetaLabel text="STOKENET"/>
      </Link>
      <div className="h-full flex items-center">
        <radix-connect-button
          ref={radixConnectButtonRef}
        ></radix-connect-button>
        {/* {xrdBalance >= 0 && (
          <p className="absolute text-sm pt-1 opacity-70">
            Balance: {xrdBalance.toLocaleString()} XRD
          </p>
        )} */}
      </div>
    </header>
  );
};

export const BetaLabel = ({
  additionalClasses,
  text
}: {
  additionalClasses?: string;
  text?: string;
}) => {
  return (
    <span
      className={`font-title text-[16px] tracking-[1px] bg-dexter-red text-sm font-bold px-2 py-[0.15rem] rounded-md hover:scale-[1.2] transition-transform duration-300 ${
        additionalClasses || ""
      }`}
    >
      {text || "BETA"}
    </span>
  );
};
export default Navbar;
