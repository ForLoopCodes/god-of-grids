import React, { useState } from "react";

export default function ContactsGrid() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });
  const contacts = [
    {
      title: "GITHUB",
      handle: `@forloopcodes`,
      link: `https://github.com/forloopcodes`,
    },
    {
      title: "TWITTER",
      handle: `@forloopcodes`,
      link: `https://twitter.com/forloopcodes`,
    },
    {
      title: "MAIL",
      handle: `meetnp1706@gmail.com`,
      link: `mailto:meetnp1706@gmail.com`,
    },
    {
      title: "TELEGRAM",
      handle: `@forloopcodes`,
      link: `https://t.me/forloopcodes`,
    },
    {
      title: "DISCORD01",
      handle: `@forloop`,
      link: `https://discord.com/users/967762715441504296`,
    },
    {
      title: "DISCORD02",
      handle: `@forloopcodes`,
      link: `https://discord.com/users/1014357327668850788`,
    },
    {
      title: "YOUTUBE",
      handle: `@forloopcodes`,
      link: `https://youtube.com/@forloopcodes`,
    },
    {
      title: "BUYMEACOFFEE",
      handle: `@forloopcoffee`,
      link: `https://www.buymeacoffee.com/forloopcoffee`,
    },
    {
      title: "DETAILS",
      handle: `redirection`,
      link: `https://www.forloopcodes.github.io/`,
    },
    {
      title: "RESUME",
      handle: `document`,
      link: `https://www.github.com/forloopcodes/`,
    },
  ];
  return (
    <div
      className={
        "mt-4 rounded-lg w-full grid gap-4" +
        (screenWidth < 800
          ? " grid-cols-2"
          : screenWidth < 1200
          ? " grid-cols-4"
          : " grid-cols-6")
      }
    >
      {contacts.map((contact, index) => (
        <a
          href={contact.link}
          target="_blank"
          rel="noreferrer"
          key={index}
          className="p-3 text-center rounded-lg cursor-pointer transition-transform duration-300 flex flex-col justify-between card"
          style={{
            background: "#161616",
          }}
        >
          <h2
            className="text-sm gradient-text1 text-white"
            style={{ userSelect: "none" }}
          >
            {contact.title} ↗
          </h2>
          <h2
            className="text-xs text-white opacity-60 mt-2"
            style={{ userSelect: "none" }}
          >
            {contact.handle}
          </h2>
        </a>
      ))}
    </div>
  );
}
