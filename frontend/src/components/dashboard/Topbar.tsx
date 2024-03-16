// Header.tsx
import React, {useState, useEffect } from 'react';
import FormModal from './FormModal';

interface TopbarProps {
  candidatesCount: number;
  fetchAllCandidates: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ candidatesCount, fetchAllCandidates }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <header className="bg-gray-50">
      <div className="mx-auto px-20 py-8 justify-between ml-0 mr-0 ">
        <div className="sm:flex sm:justify-between">
          <div className="flex items-baseline text-gray-900">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {candidatesCount}
            </h1>
            <span className="text-m text-gray-500 ml-2">Total Candidates</span>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
              onClick={openModal}
            >
              Create new Candidate
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <FormModal candidate = { undefined } closeModal={closeModal} fetchAllCandidates = {fetchAllCandidates}/>}
    </header>
  );
};

export default Topbar;
