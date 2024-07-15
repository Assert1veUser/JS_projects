
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import React, {useEffect, useState} from 'react'
import axios from 'axios'

function App(){
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/users")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    })
    const handleDisplayUsers = (e) => {
        e.preventDefault();
        axios.get("/users")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    const handleDisplayASCUsers = (e) => {
        e.preventDefault();
        axios.get("/users/ascending")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }
    const handleDisplayDESCUsers = (e) => {
        e.preventDefault();
        axios.get("/users/descending")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }

    const [dataSearchByName, setDataSearchByName] = useState({
        name: ''
    });
    const [dataComeSearchByName, setDataComeSearchByName] = useState([])
    const handleSearchByNameUsers = (e) => {
        e.preventDefault();
        axios.get("/users?name=" + dataSearchByName.name)
            .then(res => setDataComeSearchByName(res.data))
            .catch(err => console.log(err))
    }

    const [dataById, setDataById] = useState({
        id: ''
    });
    const [dataComeById, setDataComeById] = useState([]);
    const handleGetDataByIdUsers = (e) => {
        e.preventDefault();
        axios.get("/users/" + dataById.id)
            .then(res => setDataComeById(res.data))
            .catch(err => console.log(err))
    }

    const [values, setValues] = useState({
        name: ''
    })
    const handleAddUsers = (e) => {
        /*e.preventDefault();*/
        axios.post(`/users`, values)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }




    const [valuesUpId, setValuesUpId] = useState({
        id: ''
    })
    const [valuesUpName, setValuesUpName] = useState({
        name: ''
    })
    const handleUpdateUsers = (e) => {
        e.preventDefault();
        axios.put('/users/' + valuesUpId.id, valuesUpName)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }




    const [valuesDelId, setValuesDelId] = useState({
        id: ''
    })
    const handleDeleteUsers = (e) => {
        e.preventDefault();
        axios.delete('/users/' + valuesDelId.id)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
      <div className="Users">
          <h1 style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 20,
              justifyContent: 'center',
              margin: 40
          }}>Users</h1>
          <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 20,
              justifyContent: 'center',
              margin: 40
          }} className='SortUsers'>
              <Button onClick={handleDisplayUsers} type="button" appearance="ghost" size="md">Display</Button>
              &nbsp;
              <Button onClick={handleDisplayASCUsers} type="button" appearance="ghost" size="md">Sort by ASC</Button>
              &nbsp;
              <Button onClick={handleDisplayDESCUsers} type="button" appearance="ghost" size="md">Sort by DESC</Button>
          </div>
          <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 20,
              justifyContent: 'center',
              margin: 40
          }}>
              <ul>
                  {data.map(user => (
                      <li key={user.id}>{user.name}</li>
                  ))}
              </ul>
          </div>
          <div style={{
              margin: 40,
          }} className='SearchNameUsers'>
              <label>
                  Id: <input size={6} name="Input-id"
                             onChange={e =>
                                 setDataSearchByName({...dataSearchByName, name: e.target.value})}/>
              </label>
              &nbsp;
              <Button onClick={handleSearchByNameUsers} type="button" appearance="ghost" size="md">Search by name</Button>
              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 20,
                  justifyContent: 'center',
                  margin: 40
              }}>
                  <ul>
                      {dataComeSearchByName.map(user => (
                          <li key={user.id}>{user.name}</li>
                      ))}
                  </ul>
              </div>
          </div>
          <div style={{
              margin: 40,
          }} className="SearchIdUsers">
              <label>
                  Id: <input size={6} name="Input-id"
                             onChange={e =>
                                 setDataById({...dataById, id: e.target.value})}/>
              </label>
              <Button style={{margin: 20}} onClick={handleGetDataByIdUsers} type="button" appearance="ghost" size="md">Search by id</Button>
              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 20,
                  justifyContent: 'center',
                  margin: 40
              }}>
                  <ul>
                      {dataComeById.map(user => (
                          <li key={user.id}>{user.name}</li>
                      ))}
                  </ul>
              </div>
          </div>
          <div style={{
              margin: 40,
          }} className="AddUsers">
              <label>
                  Name: <input size={6} name="Input-name"
                               onChange={e =>
                                   setValues({...values, name: e.target.value})}/>
              </label>
              &nbsp;
              <Button onClick={handleAddUsers} type="button" appearance="ghost" size="md">Add a user</Button>
          </div>
          <div style={{
              margin: 40,
          }} className="EditUsers">
              <label>
                  id: <input size={3} name="Input-id"
                             onChange={e =>
                                 setValuesUpId({...valuesUpId, id: e.target.value})}/>
              </label>
              &nbsp;
              <label>
                  Name: <input size={6} name="Input-name"
                               onChange={e =>
                                   setValuesUpName({...valuesUpName, name: e.target.value})}/>
              </label>
              &nbsp;
              <Button onClick={handleUpdateUsers} type="button" appearance="ghost" size="md">Edit a user</Button>
          </div>
          <div style={{
              margin: 40,
          }} className="DeleteUsers">
              <label>
                  id: <input size={3} name="Input-id"
                             onChange={e =>
                                 setValuesDelId({...valuesDelId, id: e.target.value})}/>
              </label>
              &nbsp;
              <Button onClick={handleDeleteUsers} type="button" appearance="ghost" size="md">Delete a user</Button>
          </div>
      </div>

    )
}
export default App