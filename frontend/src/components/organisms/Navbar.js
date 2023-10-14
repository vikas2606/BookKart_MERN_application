import React from "react";
import SearchBar from "../molecules/Searchbar";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "../molecules/Logout";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav class="bg-blu border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            BookKart
          </span>
        </a>
        <div class="flex items-center">
          <SearchBar />
          <button
            onClick={toggleMenu}
            type="button"
            class={`${
              isMenuOpen ? "hidden" : ""
            }inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            aria-expanded={isMenuOpen}
          >
            <span class="sr-only">Open main menu</span>
            <h1>
              <MenuIcon />
            </h1>
          </button>
        </div>
        <div
          class={`${
            isMenuOpen ? "" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button class="btn relative" aria-current="page">
                <ShoppingCartIcon />
                <div class="notification-badge">20</div>
              </button>
            </li>
            <li>
              <Logout/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
