// candidateRouter.js
const express = require('express');
const CandidateController = require('../controllers/candidate');

const router = express.Router();

router.post('/', CandidateController.createCandidate);

router.get('/', CandidateController.getAllCandidates);

router.get('/:id', CandidateController.getCandidateById);

router.put('/:id', CandidateController.updateCandidate);

router.delete('/:id', CandidateController.deleteCandidate);

module.exports = router;