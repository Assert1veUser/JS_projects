/*Создайте массив пользователей произвольного размера, у пользователя должны быть поля ID, имя, возраст.*/
let arrUser = []

arrUser[0] = {
    id: 1,
    name: "Andrey",
    age: 20
}
arrUser[1] = {
    id: 2,
    name: "Ruslan",
    age: 21
}
arrUser[2] = {
    id: 3,
    name: "Anton",
    age: 23
}
arrUser[3] = {
    id: 4,
    name: "Petr",
    age: 24
}
arrUser[4] = {
    id: 5,
    name: "Fedr",
    age: 25
}
arrUser[5] = {
    id: 6,
    name: "Nikita",
    age: 26
}
arrUser[6] = {
    id: 7,
    name: "Ivan",
    age: 27
}
arrUser[7] = {
    id: 8,
    name: "Misha",
    age: 28
}



/*Напишите функцию sleep, которая принимает количество секунд, и возвращает promise, который производит resolve
через заданное количество секунд*/

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}



/*Напишите функцию getUser, которая принимает ID пользователя и возвращает пользователя с заданным ID из созданного
массива пользователей через некоторое время (эмуляция удаленной загрузки) с помощью функции sleep*/
// поиск элемента по заданному условию метод
// 1 способ
async function getUser(idPut) {
    await sleep(3);
    return arrUser.filter((arrUser) => arrUser.id === idPut);
}
/*console.log(getUser(3))*/

// 2 способ
function getUser_2(idPut){
    sleep(3).then(() => {
        return arrUser.filter((arrUser) => arrUser.id > idPut);
    })
}
/*console.log(getUser_2(3))*/



/*Напишите функцию loadUsersSquentially, которая принимает массив идентификаторов пользователей и загружает их
последовательно, приведите пример использования*/


async function loadUsersSquentially(userIds) {
    const users = []
    for (const userId of userIds){
        let user = await getUser(userId);
        users.push(user)
    }
    return users
}

/*let userIds = []
for (i in arrUser){
    userIds.push(arrUser[i].id)
}

loadUsersSquentially(userIds)
    .then((users) => {
        console.log("Загруженные пользователи: ", users);
    })
    .catch((error) => {
        console.error("Ошибка при загрузке пользователей: ", error);
    });*/



/*Напишите функцию loadUsersInParallel, которая принимает массив идентификаторов пользователей и загружает
их параллельно, приведите пример использования*/

function loadUsersInParallel(userIds) {
    let promises = [];

    for (let i = 0; i < userIds.length; i++) {
        promises.push(getUser(userIds[i]));
    }
    return Promise.all(promises);
}

let userIdsParallel = []
for (i in arrUser){
    userIdsParallel.push(arrUser[i].id)
}
loadUsersInParallel(userIdsParallel)
    .then(users => {
        console.log("Загруженные пользователи:", users);
    })
    .catch(error => {
        console.error("Ошибка при загрузке пользователей:", error);
    });
