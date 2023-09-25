import db from '../firestore/firebase.js';
const todosRef = db.collection('todos');

export async function getAll() {
    let querySnapshot = await todosRef.orderBy('createAt', 'DESC').get();
    console.log(querySnapshot);
    const result = querySnapshot.docs.map((query) => {
        return {
            id: query.id, ...query.data()
        }
    })

    return result;
}

export async function add(data) {
    const documentReference = await todosRef.add({
        ...data,
        createAt: new Date()
    });
    const id = documentReference.id;
    const todoDoc = (await todosRef.doc(id).get()).data();
    const { createAt, completed, title } = todoDoc;

    return { id, createAt, completed, title };
}

export async function updateTodo(ids) {
    const updatedTodos = await Promise.all(ids.map(async (id) => {
        const todoDoc = await todosRef.doc(id).get();
        const { createAt, title, completed } = todoDoc.data()
        await todosRef.doc(id).update({ completed: !completed })

        return { id, createAt, title, completed: !completed };
    }))

    return updatedTodos
}

export async function deleteTodo(ids) {
    const deletedTodos = await Promise.all(ids.map(async (id) => {
        const todoDoc = await todosRef.doc(id).get();
        const { createAt, title, completed } = todoDoc.data()
        await todosRef.doc(id).delete();

        return { id, createAt, title, completed };
    }))

    return deletedTodos
}


