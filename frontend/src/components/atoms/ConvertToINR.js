import React from 'react'

function ConvertToINR(number) {
    return number.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      });
}

export default ConvertToINR