"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUserStore } from '../utils/user.store';
import { useLoginLogout } from './useLoginLogout';
import { usePathname } from 'next/navigation';
import { EOA } from './EOA';

const activeLinkIndicatorWidthRatio = 0.7;

export default function NavBar() {
  const pathname = usePathname();

  const { isConnected, address } = useUserStore();
  const { login, logout } = useLoginLogout();

  const [tabIndicatorLeft, setTabIndicatorLeft] = useState('');
  const [tabIndicatorWidth, setTabIndicatorWidth] = useState('');

  const navLinks = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navLinks.current) {
      return;
    }
    const activeLink = navLinks.current.querySelector(
      `a[href="${pathname}"]`
    ) as HTMLAnchorElement | null;
    if (!activeLink) {
      return;
    }
    const activeLinkWidth = activeLink.clientWidth;
    const indicatorLeft =
      (activeLinkWidth - activeLinkIndicatorWidthRatio * activeLinkWidth) / 2;
    setTabIndicatorWidth(
      activeLinkIndicatorWidthRatio * activeLinkWidth + 'px'
    );
    setTabIndicatorLeft(activeLink.offsetLeft + indicatorLeft + 'px');
  }, [pathname]);

  return (
    <header className="dark flex h-[64px] items-center bg-grey-900 px-8 text-white bg-primary">
      <Link href="#" className="-mx-2 flex h-full items-center p-2">
        <div
          className="ml-3 font-bold leading-5"
        >
          Yes, ZKing!
        </div>
      </Link>

      <div
        ref={navLinks}
        className="relative ml-20 flex h-full items-center gap-x-8 pr-2 text-base"
      >
        <div
          className="absolute bottom-0 h-1 rounded-md bg-white transition-all duration-300"
          style={{ width: tabIndicatorWidth, left: tabIndicatorLeft }}
        ></div>
      </div>

      {isConnected ? (
        <div className="flex flex-1 items-center ">
          <EOA />
          <button
            type="button"
            className="-mr-2 bg-grey-900 p-2 btn btn-outline mx-auto text-white"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-end">
          <button
            className="w-[98px]"
            onClick={() => {
              login();
            }}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}