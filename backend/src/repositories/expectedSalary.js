const { di } = require('../diContainer')

class ExpectedSalary {
    static async getAll() {
        const query = 'SELECT * FROM ExpectedSalary';
        const { rows } = await di.dbPool.query(query);
        return rows;
    }

    static async getByCandidateId(id) {
        const query = 'SELECT * FROM ExpectedSalary WHERE candidate_id = $1';
        const { rows } = await di.dbPool.query(query, [id]);
        return rows[0];
    }

    static async create(expectedSalary, candidateId) {
        const query = 'INSERT INTO ExpectedSalary (candidate_id, expected_salary) VALUES ($1, $2) RETURNING *';
        const values = [candidateId, expectedSalary];
        const { rows } = await di.dbPool.query(query, values);
        return rows[0];
    }

    static async update(updatedExpectedSalary, candidateId) {
        const query = `
            INSERT INTO ExpectedSalary (candidate_id, expected_salary)
            VALUES ($1, $2)
            ON CONFLICT (candidate_id) DO NOTHING
            RETURNING *;
        `;
        const values = [candidateId, updatedExpectedSalary];
        const { rows } = await di.dbPool.query(query, values);
        if (rows.length === 0) {
            const updateQuery = `
                UPDATE ExpectedSalary
                SET expected_salary = $1
                WHERE candidate_id = $2
                RETURNING *;
            `;
            const updateValues = [updatedExpectedSalary, candidateId];
            return await di.dbPool.query(updateQuery, updateValues);
        } else {
            return rows[0];
        }
    }

    static async delete(id) {
        const query = 'DELETE FROM ExpectedSalary WHERE candidate_id = $1';
        await di.dbPool.query(query, [id]);
        return true;
    }
}

module.exports = ExpectedSalary;
