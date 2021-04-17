import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import Table from 'react-bootstrap/Table';
import { render } from '@testing-library/react';
import Form from 'react-bootstrap/Form'
const Users = () => {

    let [state, setState] = useState({file: null});
    let [dataObj, setData] = useState([]);
    let [header, setHeader] = useState([]);



    function handleInputChange(event) {
        setState({file: event.target.files[0]});
    }

    useEffect(() => {
        console.log(header)
    },[header]);

    function importUsers() {
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            state.file,
            state.file.name
        );

        axios.post('http://laravel.test/api/users', formData)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }

    function handleForce(data) {
        setData(data);
        setHeader(data[0])
    }

    function handleChange(event, index) {
        let key = event.target.value;

        let items = [...dataObj];
        let item = [...dataObj[0]];
        if(key == 'Last Name') {
        }

        switch (key) {
            case 'First Name':
                item[index] = 'first_name'
                break;
            case 'Last Name':
                item[index] = 'last_name'
                break;
            case 'Age':
                item[index] = 'age'
                break;   
            case 'Email':
                item[index] = 'email'
                break;    
        }
        items[0] = item;
        setData(items)
    }
    console.log('ss', dataObj)
    return (
        <div>
            <CSVReader
                cssClass="csv-reader-input"
                label="import CSV"
                onFileLoaded={handleForce}
                inputId="ObiWan"
                inputName="ObiWan"
                inputStyle={{color: 'red'}}
            />

            <Table striped bordered hover>
                <thead>
                        { header.length > 0 ? 
                            header.map((i, index) => {
                                return (
                               <tr>
                                    <th key={i}>{i}</th>
                                    <th>
                                        <Form.Control as="select" onChange={e => handleChange(e, index)}>
                                            <option value=''>select option</option>
                                            <option value='First Name' disabled>First Name</option>
                                            <option value='Last Name'>Last Name</option>
                                            <option value='Age'>Age</option>
                                            <option value='Email'>Email</option> 
                                        </Form.Control>
                                    </th>
                               </tr>
                                )
                            }) : null
                        }
                </thead>
            </Table>
        </div>
    )
}

export default Users;