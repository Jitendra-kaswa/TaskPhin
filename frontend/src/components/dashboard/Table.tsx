import React from 'react';
import { Candidate } from '../../interfaces/candidate';
import TableHeader from './TableComponents/TableHeader';
import TableRow from './TableComponents/TableRow';

interface TableProps {
  candidates: Candidate[];
  fetchAllCandidates : () => void;
}
const Table: React.FC<TableProps> = ({ candidates , fetchAllCandidates}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <TableHeader /> {/* Render TableHeader component */}
        <tbody>
          {candidates.map((candidate, index) => (
            <TableRow key={index} candidate={candidate} fetchAllCandidates = {fetchAllCandidates}/>
          ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
