import React from 'react';

const TableHeader = ({ headers }) => {
  return (
    <thead className="thead">
      <tr>
        {headers.map((header, index) => (
          <th key={index} scope="col" className="px-6 py-3">
            <div className="flex items-center">
              {header}
            </div>
          </th>
        ))}
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
