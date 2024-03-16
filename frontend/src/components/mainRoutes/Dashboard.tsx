import React, { useState, useEffect } from 'react';
import Topbar from '../dashboard/Topbar';
import Table from '../dashboard/Table';
import Loader from '../Loader';
import { ApiRequest } from '../../apiService';
import { API_ENDPOINTS } from '../../apiEndpoints';
import { CandidateUtils, Candidate } from '../../interfaces/candidate';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiRequest.get(API_ENDPOINTS.GET_CANDIDATES);
        const transformedResponse: Candidate[] =
          CandidateUtils.transformResponseToCandidates(response.data);
        setCandidates(transformedResponse);
        setLoading(false);
      } catch (error: any) {
        setAlert(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAllCandidates = async () => {
    try {
        const response = await ApiRequest.get(API_ENDPOINTS.GET_CANDIDATES);
        const transformedResponse: Candidate[] =
          CandidateUtils.transformResponseToCandidates(response.data);
        setCandidates(transformedResponse);
      } catch (error: any) {
        setAlert(error);
      }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (alert !== null) {
      timer = setTimeout(() => {
        setAlert(null);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [alert]);
  return (
    <div className="flex flex-col w-full">
      {alert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-t-md fixed top-10 left-1/2 transform -translate-x-1/2 max-w-xs z-50">
          <p>{alert}</p>
        </div>
      )}
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        ) : (
          <>
            <Topbar candidatesCount={candidates.length} fetchAllCandidates={fetchAllCandidates} />
            <Table candidates={candidates} fetchAllCandidates={fetchAllCandidates}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
