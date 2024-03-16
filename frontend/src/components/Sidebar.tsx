// Sidebar.tsx
import React, {useState} from 'react';

const Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const handleClick = (icon: string) => {
        setActiveTab(icon);
      };
  return (
    <div className="flex h-screen w-30 flex-col justify-between border-e">
      <div>
        <div className="inline-flex size-24 items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" height="4em" width="4em">
            <path d="M12 2A10.13 10.13 0 002 12a10 10 0 004 7.92V20h.1a9.7 9.7 0 0011.8 0h.1v-.08A10 10 0 0022 12 10.13 10.13 0 0012 2zM8.07 18.93A3 3 0 0111 16.57h2a3 3 0 012.93 2.36 7.75 7.75 0 01-7.86 0zm9.54-1.29A5 5 0 0013 14.57h-2a5 5 0 00-4.61 3.07A8 8 0 014 12a8.1 8.1 0 018-8 8.1 8.1 0 018 8 8 8 0 01-2.39 5.64z" />
            <path d="M12 6a3.91 3.91 0 00-4 4 3.91 3.91 0 004 4 3.91 3.91 0 004-4 3.91 3.91 0 00-4-4zm0 6a1.91 1.91 0 01-2-2 1.91 1.91 0 012-2 1.91 1.91 0 012 2 1.91 1.91 0 01-2 2z" />
          </svg>
        </div>
        <div className="border-t border-gray-100">
          <div className="px-2">
            <div className="py-4">
              <a
                href="/dashboard"
                className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
              >
                <svg
                  className="hover:scale-110 opacity-75"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="2.5em"
                  width="2.5em"
                >
                  <path d="M21 16V4H3v12h18m0-14a2 2 0 012 2v12a2 2 0 01-2 2h-7v2h2v2H8v-2h2v-2H3a2 2 0 01-2-2V4c0-1.11.89-2 2-2h18M5 6h9v5H5V6m10 0h4v2h-4V6m4 3v5h-4V9h4M5 12h4v2H5v-2m5 0h4v2h-4v-2z" />
                </svg>
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Dashboard
                </span>
              </a>
            </div>
            <div className="py-4">
              <a
                href="/reports"
                className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-grey-700"
              >
                <svg
                  className="hover:scale-110 opacity-75"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="2.5em"
                  width="2.5em"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h5.697M18 14v4h4M18 11V7a2 2 0 00-2-2h-2" />
                  <path d="M10 3 H12 A2 2 0 0 1 14 5 V5 A2 2 0 0 1 12 7 H10 A2 2 0 0 1 8 5 V5 A2 2 0 0 1 10 3 z" />
                  <path d="M22 18 A4 4 0 0 1 18 22 A4 4 0 0 1 14 18 A4 4 0 0 1 22 18 z" />
                  <path d="M8 11h4M8 15h3" />
                </svg>
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Reports
                </span>
              </a>
            </div>
            <div className="py-4">
              <a
                href="/settings"
                className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-grey-700"
              >
                <svg
                  className="hover:scale-110 opacity-75"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="2.5em"
                  width="2.5em"
                >
                  <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Settings
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <form action="#">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-12 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
