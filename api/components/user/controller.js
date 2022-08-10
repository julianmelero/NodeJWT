import * as store from '../../../store/dummy.js';
import { nanoid } from 'nanoid';
import * as auth from '../auth/index.js';

const TABLE ='user';

function all(injectedStore) {
    let storefn = injectedStore;
    if (!storefn) {
        storefn = store;
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(body) {
        const user = {
            name : body.name,
            username: body.username
        }

        if(body.id) {
            user.id = body.id;
        }
        else {
            user.id = nanoid();
        }
        
        if(body.password || body.username) {                                    
            await auth.ctrl.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })            
        }

        return store.upsert(TABLE, user);
    }

    return {
        list,
        get,
        upsert
    }
}

export {all};