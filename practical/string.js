const client = require('./client');


async function init(){
    // const result = await client.get('user:2');
    // console.log("Result: ",result);

    await client.set('user:3', 'Monika Sharma');
    const result = await client.get('user:3');
    console.log("Result: ",result);
    
}


init();