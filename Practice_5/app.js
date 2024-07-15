document.getElementById('addUser').addEventListener('click', async () =>{
    const input = document.getElementById('userText');
    const name = input.value;
    if(name){
        const res = await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name})
        });
        const user = await res.json();
        userToHTML(user);

        input.value = '';
    }
})
document.getElementById('updateUser').addEventListener('click', async ()=>{
    const inputId = document.getElementById('IdUser');
    const id = inputId.value;
    const inputName = document.getElementById('NameUser');
    const name = inputName.value;
    if(id && name){
        const res = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name})
        });
    }
    document.location.reload();
})
document.getElementById('deleteUser').addEventListener('click', async () => {
    const inputId = document.getElementById('IdUserDelete');
    const id = inputId.value;
    if(id){
        const res = fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json',
            }
        });
    }
    document.location.reload();

})
async function getAllUsers(){
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    console.log(users)
    users.forEach(user => userToHTML(user))
}
window.addEventListener("DOMContentLoaded", getAllUsers)


function userToHTML({id, name}){
    const userList = document.getElementById('users')
    userList.insertAdjacentHTML(`beforeend`,
        `<div class="form-check" id="${id}">
                <label class="form-check-label">
                    id: ${id}, name: ${name}
                </label>
                <button onclick="deleteUser(${id})" type="button" class="btn-close" aria-label="Close"></button>
            </div>`
    )
}

async function deleteUser(id){
    const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type' : 'application/json',
        }
    });
    document.getElementById(id).remove();;
}

