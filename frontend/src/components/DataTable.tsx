// DataTable.tsx
import React from 'react';

interface RowData {
  fullName: string;
  status: string;
  phone: string;
  email: string;
  expectedSalary: string;
  skills: string;
  totalScore: number;
}

const DataTable: React.FC = () => {
  // Dummy data
  const data: RowData[] = [
    {
      fullName: 'John Doe',
      status: 'Active',
      phone: '123-456-7890',
      email: 'john@example.com',
      expectedSalary: '$50,000',
      skills: 'React, Node.js',
      totalScore: 85,
    },
    {
      fullName: 'Jane Smith',
      status: 'Inactive',
      phone: '987-654-3210',
      email: 'jane@example.com',
      expectedSalary: '$60,000',
      skills: 'Vue.js, Python',
      totalScore: 92,
    },
    // Add more data as needed
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Expected Salary
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Skills
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Total Score
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="px-6 py-4 whitespace-no-wrap">{row.fullName}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.status}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.phone}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {row.expectedSalary}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.skills}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.totalScore}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <button className="text-gray-400 hover:text-gray-800 focus:outline-none">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
