const CandidateLogic = require('../logics/candidate');
const {
  createCandidateSchema,
  updateCandidateBodySchema,
  updateCandidateParamsSchema,
  getCandidateByIdSchema,
  deleteCandidateSchema
} = require('../validators/candidate');
const {di} = require('../diContainer')

const createCandidate = async (req, res) => {
  try {
    const { error, value } = createCandidateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const createdCandidate = await CandidateLogic.createCandidate(req.ctx, value);
    res.status(201).json({ message: 'Candidate created successfully', data: createdCandidate });
  } catch (error) {
    di.logger.error(`Error creating candidate:${error}`, req.ctx.traceId);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await CandidateLogic.getAllCandidates(req.ctx);
    res.status(200).json({ candidates: candidates });
  } catch (error) {
    di.logger.error(`Error fetching all candidates:${error}`, req.ctx.traceId);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const { error, value } = getCandidateByIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const candidate = await CandidateLogic.getCandidateById(req.ctx, value.id);
    if (candidate) {
      res.status(200).json({ data: candidate });
    } else {
      res.status(404).json({ message: 'Candidate not found' });
    }
  } catch (error) {
    di.logger.error(`Error fetching candidate by ID:${error}`, req.ctx.traceId);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const { error: paramsError, value: params } = updateCandidateParamsSchema.validate(req.params);
    if (paramsError) {
      return res.status(400).json({ message: paramsError.details[0].message });
    }

    const { error: bodyError, value: body } = updateCandidateBodySchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({ message: bodyError.details[0].message });
    }

    const updatedCandidate = await CandidateLogic.updateCandidate(req.ctx, params.id, body);
    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate updated successfully', data: updatedCandidate });
  } catch (error) {
    di.logger.error(`Error updating candidate:${error}`, req.ctx.traceId);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { error, value: params } = deleteCandidateSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const deleted = await CandidateLogic.deleteCandidate(req.ctx, params.id);
    if (deleted) {
      res.status(200).json({ message: 'Candidate deleted successfully' });
    } else {
      res.status(404).json({ message: 'Candidate not found' });
    }
  } catch (error) {
    di.logger.error(`Error deleting candidate:${error}`, req.ctx.traceId);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
};
