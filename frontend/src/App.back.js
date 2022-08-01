import React, { useState, useEffect } from 'react'

const App = () => {
  const [emp, setEmp] = useState([]);
  const [ins, setIns] = useState({
    name: '',
    skills: ''
  });
  const [up, setUp] = useState({
    id: '0',
    update: false
  })

  const fetchEmp = async () => {
    const fetchjson = await fetch('http://localhost:3300/employee');
    const response = await fetchjson.json();
    //console.log(response);
    setEmp(response)
  }

  const onchangeHandler = e => {
    setIns({ ...ins, [e.target.name]: e.target.value });
  }
  const { name, skills } = { ...ins }

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (ins.name === "" || ins.skills === "") {
      alert('All fields are Required')
    } else {
      //console.log(JSON.stringify(ins))
      var dataAdded = await fetch('http://localhost:3300/employee/create', {
        method: 'POST',
        body: JSON.stringify(ins),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(res => alert('New employee added'))
        .catch(err => console.log(err))
      setIns({
        name: '',
        skills: ''
      })
      fetchEmp()
    }
  }

  const deleteHandler = async (id) => {
    var dataDeleted = await fetch(`http://localhost:3300/employee/delete/${id}`, {
      method: 'DELETE'
    })
      .then(res => alert('One employee deleted'))
      .catch(err => console.log(err))
    fetchEmp()
  }

  const fetchHandler = async (id) => {
    const URL = `http://localhost:3300/employee/${id}`;
    const fetchjson = await fetch(URL);
    const response = await fetchjson.json();
    setUp({
      id: id,
      update: true
    })
    //console.log(response);
    setIns({
      name: response[0].name,
      skills: response[0].skills
    })
  }

  const updateHandler = async e => {
    e.preventDefault();
    if (ins.name === "" || ins.skills === "") {
      alert('All fields are Required')
    } else {
      //console.log(JSON.stringify(ins))
      var dataAdded = await fetch(`http://localhost:3300/employee/update/${up.id}`, {
        method: 'PUT',
        body: JSON.stringify(ins),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(res => alert('Employee data updated'))
        .catch(err => console.log(err))
      setIns({
        name: '',
        skills: ''
      })
      setUp({
        id: '0',
        update: false
      })
      fetchEmp()
    }
  }

  const cancelHandler = () => {
    setIns({
      name: '',
      skills: ''
    })
    setUp({
      id: '0',
      update: false
    })
  }

  useEffect(() => {
    fetchEmp()
  }, [])

  let addeditButton;
  if (up.update) {
    addeditButton = 'Update'
  } else {
    addeditButton = 'Create';
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Employees</h1>
      <div className='row justify-content-around'>
        <div className='col-8'>
          <h2>Employee List</h2>
          <table className='table table-hover emp-details'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Skills</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {emp && emp?.map((item, index) =>
                <tr key={item.id} className={item.id === up.id ? 'active' : null}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.skills}</td>
                  <td><button type='button' className='btn btn-success' onClick={(e) => fetchHandler(item.id)}><i className="fas fa-pen-to-square"></i></button></td>
                  <td><button type='button' className='btn btn-danger' onClick={(e) => deleteHandler(item.id)}><i className="fas fa-trash"></i></button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='col-4'>
          <div>
            <form onSubmit={up.update ? updateHandler : onsubmitHandler}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Enter Name</label>
                <input type="text" className="form-control" id="name" name='name' value={name} onChange={onchangeHandler} />
              </div>
              <div className='mb-3'>
                <label htmlFor='skills' className='form-label'>Enter Skills</label>
                <input type="text" className="form-control" id="skills" name='skills' value={skills} onChange={onchangeHandler} />
              </div>
              <div className="d-grid gap-2 d-md-block">
                <button type="submit" className="btn btn-primary me-md-2">{addeditButton}</button>
                {up.update ? <button type='button' className="btn btn-secondary" onClick={cancelHandler}>Cancel</button> : ''}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App