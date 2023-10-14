import React from "react";

function Alert({message}) {
  return (
    <div
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
   {message}
    </div>
  );
}

export default Alert;
