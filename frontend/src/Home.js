import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import TTable from './TableContainer'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Home = () => {
    

    const [empDetails, setempDetails] = useState([])
    const pushObject = (name, skills, email, phone, address, doj, dob, id) => {
        const obj = {
            'name': name,
            'skills': skills,
            'email': email,
            'phone': phone,
            'address': address,
            'doj': doj,
            'dob': dob,
            'update': <Link to={`/update/${id}`}><Button variant="contained"><i className="fas fa-pen-to-square"></i></Button></Link>,
            'delete': <Button variant="contained" color="error" onClick={(e) => deleteHandler(id)}><i className="fas fa-trash"></i></Button>,
        }
        return obj
    }
    const fetchempDetails = async () => {
        const empresponse = await fetch('http://localhost:3300/employee')
        const empresponsejson = await empresponse.json()
        console.log(empresponsejson)
        const creatList = [];
        empresponsejson.map((value) =>{
            creatList.push(pushObject(value.name, value.skills, value.email, value.phone, value.address, value.doj, value.dob, value.id))
            }
        );
        console.log(creatList)
        setempDetails(creatList)
    }

    const deleteHandler = async (id) => {
        var dataDeleted = await fetch(`http://localhost:3300/employee/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => alert('One employee deleted'))
            .catch(err => console.log(err))
            fetchempDetails()
    }

    useEffect(() => {
        fetchempDetails()
    }, [])

    const columns = useMemo(
        () => [{
            Header: "Employees List",
            columns: [
                {
                    Header: "Name",
                    accessor: "name"
                },
                {
                    Header: "Skills",
                    accessor: "skills"
                },
                {
                    Header: "Email",
                    accessor: "email"
                },
                {
                    Header: "Phone Number",
                    accessor: "phone"
                },
                {
                    Header: "Address",
                    accessor: "address"
                },
                {
                    Header: "Date of Join",
                    accessor: "doj"
                },
                {
                    Header: "Date of Birth",
                    accessor: "dob"
                },
                {
                    Header: "",
                    accessor: "update"
                },
                {
                    Header: "",
                    accessor: "delete"
                }
            ]
        }], []
    );

    return (
        <div>
            <Header />
            <TTable columns={columns} data={empDetails} num={3} />
        </div>
    )
}

export default Home