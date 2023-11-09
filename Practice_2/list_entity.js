const entity = [
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

function get_entity_info(){
    const result_entity = entity.map(({ name }) => name)
    let myJsonString = JSON.stringify(result_entity);
    return myJsonString
}

function get_entity_id(id){
    console.log(entity)
    let result = entity.filter((entity) => entity.id === Number(id));
    console.log(result)
    let myJsonEntity = JSON.stringify(result[0].name);
    return myJsonEntity
}

module.exports = {
    get_entity_info,
    get_entity_id
}
