const { di } = require('../diContainer')

class Candidate {
    static async getAll() {
        const query = 'SELECT * FROM Candidate';
        const { rows } = await di.dbPool.query(query);
        return rows;
    }

    static async getByCandidateId(id) {
        const query = 'SELECT * FROM Candidate WHERE candidate_id = $1';
        const { rows } = await di.dbPool.query(query, [id]);
        return rows[0];
    }

    static async create(candidate) {
        const query = 'INSERT INTO Candidate (name, email, phone, skills, status, node_experience, react_experience) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [candidate.name, candidate.email, candidate.phone, candidate.skills, candidate.status, candidate.node_experience, candidate.react_experience];
        const { rows } = await di.dbPool.query(query, values);
        return rows[0];
    }

    static async update(id, updatedCandidate) {
        const setClauses = [];
        const values = [];

        Object.entries(updatedCandidate).forEach(([key, value], index) => {
            if (key !== 'id') {
                setClauses.push(`${key} = $${index + 1}`);
                values.push(value);
            }
        });

        const setClause = setClauses.join(', ');
        const query = `UPDATE Candidate SET ${setClause} WHERE id = $${values.length + 1} RETURNING *`;
        values.push(id);
        const { rows } = await di.dbPool.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM Candidate WHERE id = $1';
        await di.dbPool.query(query, [id]);
        return true;
    }
  }

  module.exports = Candidate;
