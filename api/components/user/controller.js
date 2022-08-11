const store = require('../../../store/dummy.js');
const auth = require('../auth/index.js');

const  nanoid = require('nanoid');

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
            user.id = nanoid.nanoid();
        }
        
        if(body.password || body.username) {                                    
            await auth.upsert({
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

module.exports = {
    all,
}