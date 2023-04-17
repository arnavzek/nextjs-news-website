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

export default function loading() {
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
}
