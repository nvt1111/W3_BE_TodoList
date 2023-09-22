import fs from 'fs';

const writeFileSync = (dataObject) => {
    fs.writeFileSync('./database/todos.json', JSON.stringify({ data: dataObject }));
}

const readFileSync = () => {
    const testdata = fs.readFileSync('./database/todos.json', 'utf-8');
    const todoData = JSON.parse(testdata);//Object
    const todos = todoData.data;

    return todos;
}

// không dùng export default
export {
    writeFileSync,
    readFileSync
}