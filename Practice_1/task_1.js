/*
Создайте массив пользователей произвольного размера, у пользователя должны быть поля имя, возраст,
адрес (в адресе указан город, улица, дом)
*/

const arrUser = []



arrUser[0] = {
    name: "Andrey",
    age: 20,
    address: {
        city: "Moscow",
        street: "Pobedy",
        houseNumber: 1
    }
}
arrUser[1] = {
    name: "Ruslan",
    age: 22,
    address: {
        city: "Moscow",
        street: "Lenina",
        houseNumber: 2
    }
}
arrUser[2] = {
    name: "Nikita",
    age: 65,
    address: {
        city: "Kazan",
        street: "Pervomayskaya",
        houseNumber: 15
    }
}
arrUser[3] = {
    name: "Anton",
    age: 20,
    address: {
        city: "Moscow",
        street: "Ilyicha",
        houseNumber: 5
    }
}

/*
Напишите функцию getTotalAge, которая принимает массив пользователей и возвращает их общий возраст,
приведите пример использования
*/
let sum_age = 0
function getTotalAge(arrUser){
    for (i in arrUser){
        sum_age = sum_age + arrUser[i].age
    }
    return sum_age
}
/*console.log(getTotalAge(arrUser))*/

/*
Напишите функцию getUsersStreets, которая принимает массив пользователей и возвращает список названий улиц,
приведите пример использования
*/

// 1 способ
/*function getUsersStreets(arrUser){
    let arrStreet = []
    for (i in arrUser){
        arrStreet.push(arrUser[i].address.street)
    }
    return arrStreet
}
console.log(getUsersStreets(arrUser))*/

// 2 способ
function getUsersStreets(arrUser){
    const result = arrUser.map(({ address }) => address.street)
    return result
}
/*console.log(getUsersStreets(arrUser))*/

/*
Напишите функцию getOldPeople, которая принимает массив пользователей и возвращает список пользователей, возраст
которых более 60, приведите пример использования
*/

// 1 способ
/*function getOldPeople(arrUser){
    let arrUserOld = []
    for (i in arrUser){
        if (arrUser[i].age > 60){
            arrUserOld.push(arrUser[i])
        }
    }
    return arrUserOld
}*/
/*console.log(getOldPeople(arrUser))*/

// 2 способ

function getOldPeople(arrUser){
    const result = arrUser.filter((arrUser) => arrUser.age > 60);
    return result
}
console.log(getOldPeople(arrUser))
