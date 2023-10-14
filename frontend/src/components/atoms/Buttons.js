import React from "react";

function Buttons({input=""}) {
  return (
    <div>
      {" "}
      <button
        type="submit"
        class="w-full text-whte hover:text-blck bg-blck hover:bg-orng font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        {input}
      </button>
    </div>
  );
}

export default Buttons;
