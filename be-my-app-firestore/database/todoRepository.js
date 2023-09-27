import db from '../firestore/firebase.js';
const todosRef = db.collection('todos');

const prepareData = (doc) => {
    return { id: doc.id, ...doc.data() }
}

export async function getAll() {
    let querySnapshot = await todosRef.orderBy('createAt', 'DESC').get();
    const result = querySnapshot.docs.map((doc) => prepareData(doc));

    return result;
}

export async function add(data) {
    const dataDoc = { ...data, createAt: new Date() }
    const documentReference = await todosRef.add(dataDoc);
    const id = documentReference.id;

    return { id, ...dataDoc };
}

export async function updateTodo(data) {
    const jobs = [];

    data.map((item) => {
        const { id, ...rest } = item
        jobs.push(todosRef.doc(id).update({ ...rest }))
    });

    return await Promise.all(jobs);
}

export async function deleteTodo(ids) {
    const jobs = [];
    ids.map((id) => {
        jobs.push(todosRef.doc(id).delete())
    });

    return await Promise.all(jobs);
}


