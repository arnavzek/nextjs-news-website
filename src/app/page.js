import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import HomePage from "./HomePage";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 3600;

export default async function Home({ searchParams }) {
  // return JSON.stringify(searchParams);

  let data = await fetchArticles(searchParams.q);

  // return JSON.stringify(data);
  return <HomePage news={data} />;
}

async function fetchArticles(query) {
  let url =
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a3c07f0a1f4746698d502d7ca3778a5c";

  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=a3c07f0a1f4746698d502d7ca3778a5c`;
  }

  return await fetch(url).then((data) => data.json());
}
