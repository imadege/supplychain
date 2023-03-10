/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate('/');
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      { error && <Alert variant="danger">{error}</Alert>}
      { loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <br />
        <Button type="submit" variant="primary">Sign In</Button>

      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
