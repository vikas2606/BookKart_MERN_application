import React from "react";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

function Error({code,message}) {
  return (
    <section className="bg-transparent">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight text-white font-extrabold lg:text-9xl ">
            {code}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-500 md:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            {message}
          </p>
        
        </div>
      </div>
    </section>
  );
}

export default Error;
