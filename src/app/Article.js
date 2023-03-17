"use client";

import Link from "next/link";

export default function Article({ content }) {
  return (
    <a target={"_blank"} href={content.url}>
      <div id="articleCard">
        <img src={content.urlToImage}></img>
        <div id="txt">
          <h2 id="title"> {content.title} </h2>
          <div id="description">{content.description}</div>
        </div>
      </div>
    </a>
  );
}
