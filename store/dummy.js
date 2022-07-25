const db = {
    'user': [
        { id: "1", name: 'Julián'},
    ]
};

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    db[table].push(data);
}

async function insert(table, data) {
    const exists = get(table, id);
    if (!exists) {
        db[table].push(data);
    }    
}

function remove(table, id) {
    return true;
}

export { list, get, upsert, remove, insert }