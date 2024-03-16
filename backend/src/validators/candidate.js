const Joi = require('@hapi/joi');

const createCandidateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    skills: Joi.string().required(),
    status: Joi.string().required(),
    expected_salary: Joi.number().positive().allow(0).optional(), // Allow zero as a valid value
    node_experience: Joi.number().required(),
    react_experience: Joi.number().required(),
}).when(Joi.object({ expected_salary: Joi.exist() }).unknown(), {
    then: Joi.object({ expected_salary: Joi.number().positive().required() }), // If expected_salary exists, it must be required and positive
});


  const updateCandidateParamsSchema = Joi.object({
    id: Joi.string().uuid({ version: ['uuidv4', 'uuidv5'] }).required(),
  });

  const updateCandidateBodySchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    skills: Joi.string(),
    status: Joi.string(),
    expected_salary: Joi.number(),
    node_experience: Joi.number(),
    react_experience: Joi.number(),
  }).min(1);

  const getCandidateByIdSchema = Joi.object({
    id: Joi.string().uuid({ version: ['uuidv4', 'uuidv5'] }).required(),
  });

  const deleteCandidateSchema = Joi.object({
    id: Joi.string().uuid({ version: ['uuidv4', 'uuidv5'] }).required(),
  });

  module.exports= {
    createCandidateSchema,
    updateCandidateBodySchema,
    updateCandidateParamsSchema,
    getCandidateByIdSchema,
    deleteCandidateSchema
  }