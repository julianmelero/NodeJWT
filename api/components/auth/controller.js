const store = require('../../../store/dummy.js');
const token = require('../../../auth/index');
const bcrypt = require('bcrypt');

const TABLE ='auth';

function all(injectedStore) {
    let storefn = injectedStore;
    if (!storefn) {
        storefn = store;
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { username: username });

        bcrypt.compare(password, data.password)
        .then(equals => {
            if(equals === true) {                   
                return token.signToken(data);                
            }
            else {
                throw new Error('Información Inválida');
            }
        });
        
    }

    async function upsert(data) {
        const authData = {
            id: data.id,            
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password,7);
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login,
    }
}


module.exports = {
    all,
}