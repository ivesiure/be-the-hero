const connection = require('../database/connection');
const tables = require('../database/tables')

module.exports = {
    async index(req, resp) {
        const { page = 1 } = req.query;

        const [count] = await connection(tables.INCIDENTS).count();

        const incidents = await connection(tables.INCIDENTS)
            .join(tables.ONGS, 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        resp.header('X-Total-Count', count['count(*)']);

        return resp.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection(tables.INCIDENTS).insert({
            title, description, value, ong_id
        });

        return response.json({ id });
    },

    async delete(req, resp) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection(tables.INCIDENTS)
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return resp.status(401).json({ error: 'Operation not allowed' })
        }

        await connection(tables.INCIDENTS).where('id', id).delete();

        return resp.status(204).send();
    },
};