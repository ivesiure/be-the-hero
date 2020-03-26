
exports.up = function (knex) {
    knex.schema.createTable('incidents', table => {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');

    }).then(() => console.log('Table \'Incidents\' created successfully'));
};

exports.down = function (knex) {
    knex.schema.dropTable('incidents');
};
