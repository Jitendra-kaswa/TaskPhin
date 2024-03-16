export const API_ENDPOINTS = {
  // Candidates
  GET_CANDIDATES: `candidates`,
  GET_CANDIDATE_BY_ID: (id: string) => `candidates/${id}`,
  CREATE_CANDIDATE: `candidates`,
  UPDATE_CANDIDATE: (id: string) => `candidates/${id}`,
  DELETE_CANDIDATE: (id: string) => `candidates/${id}`,
  //   Reports
  GET_REPORTS: 'reports',
};
