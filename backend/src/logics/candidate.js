const { di } = require('../diContainer');
const Candidate = require('../repositories/candidate');
const ExpectedSalary = require('../repositories/expectedSalary')
const ScoreCalculator = require('./scoreCalculator');

class CandidateLogic {
  static async createCandidate(ctx, candidateData) {
    try {
      const createdCandidate = await Candidate.create(candidateData);
      if(candidateData.expected_salary){
        const expectedSalary = await ExpectedSalary.create(candidateData.expected_salary, createdCandidate.id);
        createdCandidate.expected_salary = expectedSalary.salary;
      }
      return createdCandidate;
    } catch (error) {
      di.logger.error(`Error creating candidate: ${error}`, ctx.traceId);
      throw error;
    }
  }

  static async getAllCandidates(ctx) {
    try {
      const candidates = await Candidate.getAll();
      const candidatesWithSalaries = await Promise.all(
        candidates.map(async (candidate) => {
          const salary = await ExpectedSalary.getByCandidateId(candidate.id);
          return { ...candidate, ...salary };
        })
      );
      candidatesWithSalaries.forEach(candidate => {
        const nodeScore = ScoreCalculator.calculateNodeScore(candidate.node_experience);
        const reactScore = ScoreCalculator.calculateReactScore(candidate.react_experience);
        candidate.total_score = ScoreCalculator.calculateTotalScore(nodeScore, reactScore);
      });
      return candidatesWithSalaries;
    } catch (error) {
      di.logger.error(`Error fetching all candidates: ${error}`, ctx.traceId);
      throw error;
    }
  }

  static async getCandidateById(ctx, id) {
    try {
      const candidate = await Candidate.getById(id);
      const nodeScore = ScoreCalculator.calculateNodeScore(candidate.node_experience);
      const reactScore = ScoreCalculator.calculateReactScore(candidate.react_experience);
      candidate.total_score = ScoreCalculator.calculateTotalScore(nodeScore, reactScore);
      return candidate;
    } catch (error) {
      di.logger.error(`Error fetching candidate by ID: ${error}`, ctx.traceId);
      throw error;
    }
  }

  static async updateCandidate(ctx, id, updatedCandidateData) {
    try {
      const updatedSalary = updatedCandidateData.expected_salary;
      let updatedCandidate = {}
      if (updatedCandidateData.hasOwnProperty('expected_salary')) delete updatedCandidateData.expected_salary
        if(Object.keys(updatedCandidateData).length > 0) updatedCandidate = await Candidate.update(id, updatedCandidateData);
      if (updatedSalary){
        const updatedData = await ExpectedSalary.update(updatedSalary, id)
        updatedCandidate = {...updatedCandidate, updatedData}
      }
      return updatedCandidate;
    } catch (error) {
      di.logger.error(`Error updating candidate: ${error}`, ctx.traceId);
      throw error;
    }
  }

  static async deleteCandidate(ctx, id) {
    try {
      const deleted = await Candidate.delete(id);
      return deleted;
    } catch (error) {
      di.logger.error(`Error deleting candidate: ${error}`, ctx.traceId);
      throw error;
    }
  }
}

module.exports = CandidateLogic;
