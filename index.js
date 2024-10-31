const express = require('express')
const redis = require('redis')
const url = 'redis://localhost:6379';

const cache = redis.createClient({url})
cache.connect();

const app = express()
const port = 3000

const fatorial = (n) => {
    if(n === 0){
        return 1;
    }
    return n * fatorial(n-1);
}

cache.on('connect', () => {
  console.log('Redis is ready');
});
 
cache.on('error', (e) => {
  console.log('Redis error', e);
});

app.get('/fatorial/:value/', async (req, res) => {
    const { value } = req.params;
    const key = `fatorial_${value}`;
    try{
        let result = await cache.get(key);
        if (!result) {
            console.log('Calculating fatorial...')
            result = fatorial(value);
            await cache.set(key, result, {EX: 10});
        }else {
            console.log('Data from cache!')
        }
        res.send(`Fatorial de ${value} é ${result}`);
    }catch(e){
        res.send(e.message);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})