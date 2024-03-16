// TableHeader.tsx

import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100 light:bg-gray-700">
      <tr>
        <th scope="col" className="px-6 py-3 text-center">
          Name
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Email
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Skills
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Expected Salary(INR)
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Node Js Experience
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          React Js Experience
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Total Score
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Current Status
        </th>
        <th scope="col" className="px-6 py-3 text-center">
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
