import db from '../firestore/firebase.js';
const todosRef = db.collection('todos');

export async function getAll() {
    let querySnapshot = await todosRef.get();
    let result = [];
    //todo: không dùng forEach 
    querySnapshot.forEach(query => {
        // todo: hàm này viết lại thành hàm prepare data
        result.push({ id: query.id, ...query.data() })
    })

    result.sort((a, b) => b.createAt - a.createAt);

    return result;
}

export async function add(data) {
    const DocumentReference = await todosRef.add({
        ...data,
        createAt: new Date()
    });

    //todo: không getAll 1 lần nữa chỉ trả về  data của todo đã tạo + id 
    const todos = await getAll();

    return todos;
}

export async function updateTodo(ids) {

    //todo: tìm cachs khác không getAll ra rồi fillter , cả delete cũng thế 
    let todos = await getAll();
    const todosToUpdate = todos.filter(todo => ids.includes(todo.id));
    const updationPromises = todosToUpdate.map(todo => todosRef.doc(todo.id).update({ completed: !todo.completed }));
    await Promise.all(updationPromises);// giam tgian
    //todo : trả về data đã update không trả về tất cả todo, tương tự với delete 
    const newTodos = await getAll();

    return newTodos;
}

export async function deleteTodo(ids) {
    const todos = await getAll();
    const todosToDelete = todos.filter(todo => ids.includes(todo.id));
    const deletionPromises = todosToDelete.map(todo => todosRef.doc(todo.id).delete());
    await Promise.all(deletionPromises);// giam tgian
    const newTodos = await getAll();

    return newTodos;
}


