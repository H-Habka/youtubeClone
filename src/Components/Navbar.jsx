import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchBar from "./SearchBar";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-[13px] md:px-4 pt-2 md:pr-8">
      <Link to="/" className="h-12 w-12 flex items-center">
        <LazyLoadImage src={logo} alt="logo" height={45} />
      </Link>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
