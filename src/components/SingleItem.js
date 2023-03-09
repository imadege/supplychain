import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getItemDetails } from '../actions/itemAction';
import FormContainer from './FormContainer';

function SingleItem() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const itemDetails = useSelector((state) => state.itemDetails);
  const { item } = itemDetails;

  useEffect(() => {
    dispatch(getItemDetails(id));
  }, [id]);

  return (
    <FormContainer>
      <ListGroup variant="flush">
        <ListGroup.Item>{item.id}</ListGroup.Item>
        <ListGroup.Item>{item.name}</ListGroup.Item>
        <ListGroup.Item>{item.item_code}</ListGroup.Item>
        <ListGroup.Item>{item.color}</ListGroup.Item>
        <ListGroup.Item>{item.price}</ListGroup.Item>
      </ListGroup>
    </FormContainer>
  );
}

export default SingleItem;
