/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createEventItem, listEventItems } from '../actions/evenItemAction';
import FormContainer from './FormContainer';

function AddEventItem() {
  const [event_type, setEventType] = useState('');
  const [item, setItem] = useState('');
  const [event_description, setEventDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsList = useSelector((state) => state.itemsList);
  const { items = [], loading } = itemsList;

  useEffect(() => {
    dispatch(listEventItems());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEventItem({
      event_type, item, event_description,
    }));
    if (!loading) {
      dispatch(listEventItems(''));
      navigate('/');
    }
    navigate('/');
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="eventtype">
          <Form.Label>Event type</Form.Label>
          <Form.Select
            onChange={(e) => setEventType(e.target.value)}
            aria-label="Default select example"
          >
            <option
              key="ASSIGNEE"
              value="ASSIGNEE"
            >
              assignee
            </option>
            <option
              key="LOCATION"
              value="LOCATION"
            >
              location
            </option>

          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group controlId="price">
          <Form.Label>Item</Form.Label>
          <Form.Select
            onChange={(e) => setItem(e.target.value)}
            aria-label="Default select example"
          >
            {items && items.map((option) => (
              <option
                key={option.id}
                value={option.id}
              >
                {option.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            size="lg"
            className="w-100"
            as="textarea"
            rows={5}
            required
            value={event_description}
            onChange={(event) => setEventDescription(event.target.value)}
          />
        </Form.Group>
        <br />
        <br />
        <Button type="submit" variant="primary">Add Event</Button>

      </Form>
    </FormContainer>
  );
}

export default AddEventItem;
