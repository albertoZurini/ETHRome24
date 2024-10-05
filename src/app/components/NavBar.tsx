"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUserStore } from '../utils/user.store';
import { useLoginLogout } from './useLoginLogout';
import { usePathname } from 'next/navigation';

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
    <header className="dark flex h-[64px] items-center bg-grey-900 px-8 text-white">
      <Link href="/protectedData" className="-mx-2 flex h-full items-center p-2">
        <div
          className="ml-3 font-bold leading-5"
          style={{ fontFamily: 'Space Mono' }}
        >
          iExec
        </div>
      </Link>

      <div
        ref={navLinks}
        className="relative ml-20 flex h-full items-center gap-x-8 pr-2 text-base"
      >
        <Link href="/protectedData" className="-mx-2 flex h-full items-center p-2">
          My Protected Data
        </Link>
        <Link href="/sendEmail" className="-mx-2 flex h-full items-center p-2">
          Send Email
        </Link>
        <div
          className="absolute bottom-0 h-1 rounded-md bg-white transition-all duration-300"
          style={{ width: tabIndicatorWidth, left: tabIndicatorLeft }}
        ></div>
      </div>

      {isConnected ? (
        <div className="flex flex-1 items-center justify-end gap-x-1">
          <span>{address}</span>
          <button
            type="button"
            className="-mr-2 bg-grey-900 p-2"
            onClick={() => logout()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M18 12h-6m0 0l3-3m-3 3l3 3"
              />
            </svg>
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