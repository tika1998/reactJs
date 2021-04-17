import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useCookies } from 'react-cookie';
import {useDispatch, useSelector} from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const dispatch = useDispatch();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    axios.post('http://app.test/api/login', {
        email: email,
        password: password
      })
      .then(function (data) {
        setCookie("Authorization", data.data.access_token, { path: "/" });
        dispatch(props.LoggedIn(true));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="Login">
      <Form >
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="button" disabled={!validateForm()} onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
}


export default Login;