/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_UPDATE_RESET } from '../constants/itemConstants';
import { getItemDetails, updateItem } from '../actions/itemAction';

function EditItem({ itemVisible, selectedItem, handleItemModalClose }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [item_code, setItemCode] = useState('');
  const [color, setItemColor] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { item } = itemDetails;

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const { success: successUpdate } = itemUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });
      navigate('/');
    } else if (!item.item_code || item.id !== Number(selectedItem.id)) {
      dispatch(getItemDetails(selectedItem.id));
    } else {
      setName(item.name);
      setPrice(item.price);
      setItemCode(item.item_code);
      setItemCode(item.color);
    }
  }, [item, selectedItem, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateItem({
      id: item.id, name, price, item_code, color,
    }));
    handleItemModalClose();
    navigate('/');
  };

  return (
    <Form onSubmit={submitHandler}>
      <Modal show={itemVisible} onHide={handleItemModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Edit Item</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="serves per item">
            <Form.Label>Serves per item</Form.Label>
            <Form.Control
              type="price"
              placeholder="Enter Serves per item"
              value={item_code}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Color"
              value={color}
              onChange={(e) => setItemColor(e.target.value)}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleItemModalClose}>
            Close
          </Button>
          <Button type="submit" onClick={submitHandler} variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </Form>
  );
}

export default EditItem;
