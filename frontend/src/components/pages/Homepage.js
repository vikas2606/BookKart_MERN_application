import React, { useState } from "react";
import Navbar from "../organisms/Navbar";
import AddIcon from "@mui/icons-material/Add";
import AddBook from "../organisms/AddBook";

import { Outlet } from "react-router-dom";

function Homepage() {
  const [isAddBookOpen, setAddBookOpen] = useState(false);

  return (
    <div className="gap-4 mb-4">
      <Navbar />
      <div className="mx-4 flex  items-end justify-end">
        <button
          className="btn w-auto"
          onClick={() => {
            setAddBookOpen(true);
          }}
        >
          <AddIcon /> Add Book
        </button>
      </div>
      {isAddBookOpen && (
        <AddBook
          isAddBookOpen={isAddBookOpen}
          setAddBookOpen={setAddBookOpen}
        />
      )}

      <Outlet />
    </div>
  );
}

export default Homepage;
