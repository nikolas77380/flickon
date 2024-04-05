"use client";
import Image from "next/image";
import { Navbar } from "flowbite-react";

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
  {
    title: "Лiга",
    href: "/league",
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
        {MENU_ITEMS.map((el, index) => (
          <Navbar.Link
            className="text-white hover:text-secondary"
            key={index}
            href={el.href}
          >
            {el.title}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
