import * as store from '../../../store/dummy.js';
import { nanoid } from 'nanoid';

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

    function upsert(body) {
        const user = {
            name: body.name
        }

        if(body.id) {
            user.id = body.id;
        }
        else {
            user.id = nanoid();
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