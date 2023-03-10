import React, { useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getItemDetails } from '../actions/itemAction';
import FormContainer from './FormContainer';

function SingleItem() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getItemDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getItemDetails(id));
  }, [id]);

  const itemDetails = useSelector((state) => state.itemDetails);
  const { item, loading } = itemDetails;

  return (
    <FormContainer>
      {!loading && (
        <>
          <h1>{item.name}</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Button>CODE</Button>
          &nbsp;&nbsp;
              {item.item_code}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button>COLOR</Button>
          &nbsp;&nbsp;
              {item.color}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button>PRICE</Button>
              &nbsp;&nbsp;
              {item.price}
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </FormContainer>
  );
}

export default SingleItem;
