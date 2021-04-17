import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
const Register = () => {
    const [message, setMessage] = useState(null);

    let [state, setState] = useState(
        {
            name: null,
            surname: null,
            email: null,
            password: null,
            passwordConfirmation: null,
        }
    );

    function importUsers() {

        axios.post('http://laravel.test/api/register',
            {
                first_name: 'Tika',
                last_name: 'Hyan',
                email: 'tigranuhi@gohacktech.com',
                password: 'Tika',
            })
            .then((res) => {
                if (res.data.code) {
                    setMessage(res.data.message)
                }
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '500px'
    }

    console.log(message)
    return (
        <div>
            <Modal show={message}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>

            <form encType="multipart/form-data" method='post' style={style}>
                <input type="text" name="first_name" required placeholder="name"/>
                <input type="text" name="last_name" required placeholder="surname"/>
                <input type="email" name="email" required placeholder="email"/>
                <input type="password" name="password" required placeholder="password"/>
                <input type="password" name="passwordConfirmation" required placeholder="passwordConfirmation"/>
                <button type='button' onClick={importUsers}>Sign up</button>
            </form>
        </div>
    )
}

export default Register;