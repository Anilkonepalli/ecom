const User = require('../models/user');

const findByData = async function(data) {
       return await User.findOne(data)
        .then(async (mongoUser) => {
            console.log('User found: '+ JSON.stringify(mongoUser));
            if(mongoUser === null || mongoUser === 'undefined' || mongoUser.length < 1) {
                 return await User.create(data).then((userObj) => {
                    console.log("User created: "+JSON.stringify(userObj));
                    return userObj;
                });
            }
            else {
                return mongoUser;
            }
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports.findByData = findByData;
