const db = require('../database/dbConfig.js');

module.exports = {
    add, 
    find,
    findBy,
    findById
};

function find() {
    return db('jokes').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('jokes').where(filter);
}

async function add(user) {
    const [id] = await db('jokes').insert(user);

    return findById(id);
}

function findById(id) {
    return db('jokes')
        .where({ id })
        .first();
}