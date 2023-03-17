"use client";

import { useEffect, useState } from "react";
import Article from "./Article";
import BounceLoader from "react-spinners/BounceLoader";
import { BiSearch } from "react-icons/bi";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function HomePage() {
  const [news, setNews] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
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
          <button id="searchBtn" onClick={doSearch}>
            <BiSearch />
          </button>
        </div>
      </div>

      <div id="main">
        <div id="categories">
          <div id="category" key={"all"} onClick={fetchArticles}>
            All
          </div>
          {renderCategories()}
        </div>
        <div id="content">{renderArticle()}</div>
      </div>
    </>
  );

  function updateSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function doSearch() {
    search(searchQuery);
  }

  function fetchArticles() {
    setLoading(true);

    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a3c07f0a1f4746698d502d7ca3778a5c"
    )
      .then((data) => data.json())
      .then((res) => {
        setNews(res);
        setLoading(false);
        console.log(res);
      });
  }

  function search(query) {
    if (!query) return null;
    setLoading(true);
    if (!query) query = "";

    fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=2023-02-17&sortBy=publishedAt&apiKey=a3c07f0a1f4746698d502d7ca3778a5c`
    )
      .then((data) => data.json())
      .then((res) => {
        setNews(res);
        setLoading(false);
        console.log(res);
      });
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
      <div
        id="category"
        key={item}
        onClick={() => {
          search(item);
        }}
      >
        {item}
      </div>
    ));

    return list;
  }

  function renderArticle() {
    if (!news) return [];

    if (!news.articles) return [];

    return news.articles.map((item, i) => <Article key={i} content={item} />);
  }
}
