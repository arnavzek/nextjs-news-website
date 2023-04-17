"use client";

import { useEffect, useState } from "react";
import Article from "./Article";
import BounceLoader from "react-spinners/BounceLoader";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function HomePage({ news }) {
  // const [news, setNews] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchArticles();
  }, []);

  if (loading)
    return (
      <div id="loading">
        <BounceLoader
          color={"#ffffff"}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    <>
      <div id="header">
        <h1>The News Website</h1>
        <div id="searchBox">
          <input
            onChange={updateSearchQuery}
            value={searchQuery}
            placeholder="Search"
            id="searchBar"
          ></input>
          <a href={"/?q=" + searchQuery}>
            <button id="searchBtn">
              <BiSearch />
            </button>
          </a>
        </div>
      </div>

      <div id="main">
        <div id="categories">
          <a href={"/?q=news"}>
            <div id="category" key={"all"}>
              All
            </div>
          </a>
          {renderCategories()}
        </div>
        <div id="content">{renderArticle()}</div>
      </div>
    </>
  );

  function updateSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function renderCategories() {
    let categories = [
      "Technology",
      "Finance",
      "Health",
      "Sports",
      "Politics",
      "Cricket",
      "Fashion",
      "Entertainment",
      "Science",
      "Physics",
    ];

    let list = categories.map((item) => (
      <a key={item} href={"/?q=" + item}>
        {" "}
        <div id="category" key={item}>
          {item}
        </div>{" "}
      </a>
    ));

    return list;
  }

  function renderArticle() {
    if (!news) return [];

    if (!news.articles) return [];

    let articles = news.articles.slice(0, 10);
    return articles.map((item, i) => <Article key={i} content={item} />);
  }
}
