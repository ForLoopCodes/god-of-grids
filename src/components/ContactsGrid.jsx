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
      link: `https://forloopcodes.github.io/`,
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
            {contact.title}{" "}
            <svg viewBox="0 0 14 14" className="w-4 h-4 inline-block">
              <path
                d="M10.9639 8.92676L10.957 3.59473C10.957 3.42155 10.9023 3.28027 10.793 3.1709C10.6882 3.05697 10.5446 3 10.3623 3H5.03027C4.8571 3 4.7181 3.05697 4.61328 3.1709C4.50846 3.28027 4.45605 3.41016 4.45605 3.56055C4.45605 3.70638 4.51074 3.83398 4.62012 3.94336C4.73405 4.05273 4.86393 4.10742 5.00977 4.10742H6.58887L9.2959 4.01172L8.26367 4.89355L3.1709 10C3.05697 10.1094 3 10.237 3 10.3828C3 10.5332 3.05697 10.6676 3.1709 10.7861C3.28939 10.9046 3.42383 10.9639 3.57422 10.9639C3.72461 10.9639 3.85449 10.9092 3.96387 10.7998L9.06348 5.69336L9.95898 4.66113L9.84277 7.34766V8.9541C9.84277 9.09994 9.89746 9.22982 10.0068 9.34375C10.1208 9.45768 10.2529 9.51465 10.4033 9.51465C10.5492 9.51465 10.679 9.45996 10.793 9.35059C10.9069 9.23665 10.9639 9.09538 10.9639 8.92676Z"
                fill="white"
              ></path>
            </svg>
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
