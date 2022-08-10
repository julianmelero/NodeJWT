import * as store from '../../../store/dummy.js';
import { sign } from '../../../auth/index.js';
import bcrypt from 'bcrypt';


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
                return sign(data);                
            }
            else {
                throw new Error('Información Inválida');
            }
        });

        return sign(data);
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


export {all};