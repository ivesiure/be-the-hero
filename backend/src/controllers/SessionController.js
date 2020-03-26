const connection = require('../database/connection');
const tables = require('../database/tables')

module.exports = {
    async index(req, resp) {
        const { id } = req.body;

        const ong = await connection(tables.ONGS)
            .where('id', id)
            .select('name')
            .first();

        if (!ong){
            return resp.status(404).json({ error: 'No ONG found' });
        }

        return resp.json(ong);
    },
};