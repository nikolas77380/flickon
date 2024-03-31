"use client";
import Image from "next/image";
import { Navbar } from "flowbite-react";
import Link from "next/link";

const MENU_ITEMS = [
  {
    title: "Додому",
    href: "/",
  },
  {
    title: "Новини",
    href: "/news",
  },
  {
    title: "Результати",
    href: "/results",
  },
  {
    title: "Розклад",
    href: "/fixtures",
  },
];

export default function Header() {
  return (
    <Navbar className="bg-header text-white fixed w-full z-50">
      <Navbar.Brand href="/">
        <Image
          src="/logo.png?1"
          className="h-8"
          width={50}
          height={50}
          alt="Flowbite Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {MENU_ITEMS.map((el) => (
          <Link
            key={el.title}
            href={el.href}
            className="text-white hover:text-secondary"
          >
            {el.title}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
