import * as store from '../../../store/dummy.js';
import { sign } from '../../../auth/index.js';
const TABLE ='auth';

function all(injectedStore) {
    let storefn = injectedStore;
    if (!storefn) {
        storefn = store;
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { username: username });
        if (data.password === password) {
            // Generate Token
            return sign(data);
        }
        else {
            throw new Error('Información Inválida');
        }        
    }

    function upsert(data) {
        const authData = {
            id: data.id,            
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login,
    }
}


export {all};