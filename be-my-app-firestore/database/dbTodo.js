import fs from 'fs';

const resp = await fetch(`https://jsonplaceholder.typicode.com/todos`);
const jsonData = await resp.json(); // Obj
fs.writeFileSync('product1.json', JSON.stringify(jsonData, null, 2), 'utf8');