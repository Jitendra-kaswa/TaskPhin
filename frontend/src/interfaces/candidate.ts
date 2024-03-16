import { Status } from '../enums/candidateStatus';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  status: Status;
  total_score: number;
  expected_salary?: any;
  node_experience: number;
  react_experience: number;
}

export const CandidateUtils = {
  fromRawData: (rawData: any): Candidate => {
    return {
      id: rawData.id,
      name: rawData.name,
      email: rawData.email,
      phone: rawData.phone,
      skills: rawData.skills,
      status: rawData.status as Status,
      total_score: rawData.total_score,
      expected_salary: rawData.expected_salary ?? 0,
      node_experience: rawData.node_experience,
      react_experience: rawData.react_experience,
    };
  },

  getCandidatesListFromResponse: (response: any): Candidate[] => {
    return response.candidates.map((candidateData: any) =>
      CandidateUtils.fromRawData(candidateData),
    );
  },

  transformResponseToCandidates: (data: any): Candidate[] => {
    return data.candidates.map((candidate: any) =>
      CandidateUtils.fromRawData(candidate),
    );
  },
};
