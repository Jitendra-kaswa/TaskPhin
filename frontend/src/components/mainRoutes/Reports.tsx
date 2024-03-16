import React from 'react';

function Reports() {
  const data = [5, 10, 15, 20, 25];
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-3">Reports Page</h1>
      <div className="flex justify-center">
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">Graph 1</h2>
          <div className="bg-gray-200 p-4">
            {/* Dummy Bar Chart */}
            <div className="flex justify-between">
              {data.map((value, index) => (
                <div
                  key={index}
                  className="bg-blue-500 h-8"
                  style={{ width: `${value * 5}px` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-5">
          <h2 className="text-lg font-semibold mb-2">Graph 2</h2>
          <div className="bg-gray-200 p-4">
            <svg width="100%" height="100">
              {data.map((value, index) => (
                <circle
                  key={index}
                  cx={(index * 100) / 4 + 10}
                  cy={value}
                  r="5"
                  fill="blue"
                />
              ))}
              <polyline
                fill="none"
                stroke="blue"
                strokeWidth="2"
                points={data.map((value, index) => `${(index * 100) / 4 + 10},${value}`).join(' ')}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
