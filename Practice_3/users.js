const users = [
    {
        id: 1,
        name: "name1"
    },
    {
        id: 2,
        name: "name2"
    },
    {
        id: 3,
        name: "name3"
    },
    {
        id: 4,
        name: "name4"
    },
    {
        id: 5,
        name: "name5"
    }
]
function isUserValid(user) {
    return user.name !== undefined
}

function hasUser(userId) {
    return users.find((user) => user.id === userId) !== undefined
}

module.exports = {users, isUserValid,
    hasUser}