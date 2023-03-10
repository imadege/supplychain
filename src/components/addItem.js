/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createItem, listItems } from '../actions/itemAction';
import FormContainer from './FormContainer';
import Loader from './Loader';

function AddItem() {
  const [name, setName] = useState('');
  const [item_code, setItemCode] = useState('');
  const [price, setPrice] = useState('');
  const [color, setItemColor] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createItem({
      name, color, price, item_code,
    }));
    if (!loading) {
      dispatch(listItems(''));
      navigate('/');
    }
  };

  return (
    <FormContainer>
      <center><h1>Create Item</h1></center>
      { error && <Alert variant="danger">{error}</Alert>}
      { loading && <Loader />}

      <Form onSubmit={submitHandler}>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            required
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="price"
            required
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="item_code">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="item_code"
            required
            placeholder="Enter Code"
            value={item_code}
            onChange={(e) => setItemCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="color"
            required
            placeholder="Enter Color"
            value={color}
            onChange={(e) => setItemColor(e.target.value)}
          />
        </Form.Group>

        <br />
        <br />
        <Button type="submit" variant="primary">Add Item</Button>

      </Form>

    </FormContainer>
  );
}

export default AddItem;
