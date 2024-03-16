// TableRow.tsx

import React, {useState, useEffect} from 'react';
import { Candidate } from '../../../interfaces/candidate';
import { ApiRequest } from '../../../apiService';
import { API_ENDPOINTS } from '../../../apiEndpoints';
import FormModal from '../FormModal';

interface TableRowProps {
  candidate: Candidate;
  fetchAllCandidates: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ candidate, fetchAllCandidates }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [alert, setAlert] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (alert !== null) {
          timer = setTimeout(() => {
            setAlert(null);
          }, 1000);
        }
        return () => clearTimeout(timer);
      }, [alert]);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
      const [showConfirmationModal, setShowConfirmationModal] = useState(false);

        const handleDeleteClick = () => {
            setShowConfirmationModal(true);
        };

        const handleConfirmDelete = async() => {
            try {
                await ApiRequest.delete(API_ENDPOINTS.DELETE_CANDIDATE(candidate.id));
                fetchAllCandidates()
              } catch (error: any) {
                setAlert(error);
              }
            setShowConfirmationModal(false);
        };

        const handleCancelDelete = () => {
            setShowConfirmationModal(false);
        };
  return (
    <tr className={'odd:bg-white border-b dark:border-gray-700'}>
        {alert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-t-md fixed top-10 left-1/2 transform -translate-x-1/2 max-w-xs z-50">
          <p>{alert}</p>
        </div>
      )}
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
        {candidate.name}
      </td>
      <td className="px-6 py-4 text-center">{candidate.email}</td>
      <td className="px-6 py-4 text-center">{candidate.skills}</td>
      <td className="px-6 py-4 text-center">{
      (candidate.expected_salary !== '' && candidate.expected_salary !== 0)
      ? candidate.expected_salary
      : `Data not available`
      }</td>
      <td className="px-6 py-4 text-center">{candidate.node_experience}</td>
      <td className="px-6 py-4 text-center">{candidate.react_experience}</td>
      <td className="px-6 py-4 text-center">{candidate.total_score}</td>
      <td className="px-6 py-4 text-center">{candidate.status}</td>
      <td className="px-6 py-4 text-center">
      <button
          onClick={toggleDropdown}
          className="focus:outline-none"
          aria-expanded={showDropdown ? 'true' : 'false'}
          aria-haspopup="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2em"
            width="2em"
            className="cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M8 16a2 2 0 11-4 0 2 2 0 014 0zm0-6a2 2 0 11-4 0 2 2 0 014 0zm0-6a2 2 0 11-4 0 2 2 0 014 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {
            showDropdown && (
                <div className="absolute right-20 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <button className="block w-full px-4 py-2 text-left text-sm text-blue-500" role="menuitem" onClick = {openModal}>
                      Edit
                    </button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-red-500" role="menuitem" onClick = {handleDeleteClick}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
        {showConfirmationModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg">
              <p className="text-lg font-semibold mb-4">Are you sure you want to delete?</p>
              <div className="flex justify-center">
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-md mr-2 hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
         {isModalOpen && <FormModal candidate = { candidate } closeModal={closeModal} fetchAllCandidates = {fetchAllCandidates}/>}
      </td>
    </tr>
  );
};

export default TableRow;
