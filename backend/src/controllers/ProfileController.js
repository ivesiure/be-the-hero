const connection = require('../database/connection');
const tables = require('../database/tables')

module.exports = {
    async index(req, resp) {
        const ong_id = req.headers.authorization;

        const incidents = await connection(tables.INCIDENTS)
            .where('ong_id', ong_id)
            .select('*');

        return resp.json(incidents);
    },
};