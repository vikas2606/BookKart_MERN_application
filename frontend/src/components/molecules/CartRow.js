import React from 'react'

function CartRow() {
  return (
    <div> <tr
    key={item._id}
    className="bg-gray-800 border-b border-gray-700 "
  >
    <td>{item.book.title}</td>
    <td className="inline-flex rounded-md shadow-sm">
      <button className="btn-group-left">
        <RemoveIcon />
      </button>
      <span className="disbled-input">{item.quantity}</span>
      <button className="btn-group-right">
        <AddIcon />
      </button>
    </td>

    <td>{ConvertToINR(item.book.price)}</td>
    <td>
      <button className="text-red-600 font-bold">Remove</button>
    </td>
  </tr></div>
  )
}

export default CartRow