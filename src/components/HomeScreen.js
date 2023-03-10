/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button, Container, Form, Tab, Table, Tabs,
} from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { listEventItems } from '../actions/evenItemAction';
import { deleteItem, listItems } from '../actions/itemAction';
import EditItem from './editItemModal';
import Loader from './Loader';
// import { useDispatch } from 'react-redux';

function HomeScreen() {
  const [itemVisible, setItemModalShow] = useState(false);
  const [selectedItem, setItemDetails] = useState(null);
  const [searchEventItem, setSearchEventItem] = useState('');
  const [searchItem, setSearchItem] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRowClick = (e, row) => {
    navigate(`/item/${row.id}`);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteItem(id));
    }
  };

  useEffect(() => {
    dispatch(listItems(searchItem));
  }, [dispatch]);

  useEffect(() => {
    dispatch(listEventItems(searchEventItem));
  }, [dispatch]);

  const handleItemModalShow = (item) => {
    setItemModalShow(true);
    setItemDetails(item);
  };

  const handleItemModalClose = () => setItemModalShow(false);

  const eventItemList = useSelector((state) => state.eventItemList);
  const { events, loading: loadingEvents, error: errorEvents } = eventItemList;

  const itemsList = useSelector((state) => state.itemsList);
  const { items, loading: loadingItems, error: errorItems } = itemsList;

  const handleEventItemSearch = (e) => {
    e.preventDefault();
    dispatch(listEventItems(searchEventItem));
  };

  const handleItemSearch = (e) => {
    e.preventDefault();
    dispatch(listItems(searchItem));
  };

  return (
    <Container className="mt-5 mb-5">
      <Tabs
        defaultActiveKey="items"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="items" title="Items">
          <center><h1>All Items</h1></center>
          <Button onClick={() => (navigate('/create/item'))}>Create Item</Button>
          <br />
          <br />
          <Form className="d-flex" onSubmit={handleItemSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
          <br />
          <br />
          {loadingItems
            ? (<Loader />)
            : errorItems
              ? (<Alert variant="danger">{errorItems}</Alert>)
              : (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>ITEM CODE</th>
                      <th>COLOR</th>
                      <th>PRICE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items && items.map((item) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.item_code}</td>
                        <td>{item.color}</td>
                        <td>{item.price}</td>
                        <td>
                          <Button
                            onClick={() => handleItemModalShow(item)}
                            variant="light"
                            className="btn-sm"
                          >
                            <i className="fas fa-edit" />
                          </Button>

                          <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(item.id)}>
                            <i className="fas fa-trash" />
                          </Button>
                  &nbsp;
                          <Button
                            onClick={(e) => handleRowClick(e, item)}
                            variant="light"
                            className="btn-sm"
                          >
                            View single item
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
        </Tab>
        <Tab eventKey="events" title="Events">
          <center><h1>All Events</h1></center>
          <Button onClick={() => (navigate('/create/event'))}>Create Event</Button>
          <br />
          <br />
          <Form className="d-flex" onSubmit={handleEventItemSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchEventItem(e.target.value)}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
          <br />
          <br />
          {loadingEvents
            ? (<Loader />)
            : errorEvents
              ? (<Alert variant="danger">{errorEvents}</Alert>)
              : (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TYPE</th>
                      <th>ITEM</th>
                      <th>DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events && (events || []).map((event) => (
                      <tr>
                        <td>{event.id}</td>
                        <td>{event.event_type}</td>
                        <td>{event.item}</td>
                        <td>{event.event_description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
        </Tab>

      </Tabs>

      {selectedItem && (
      <EditItem
        itemVisible={itemVisible}
        selectedItem={selectedItem}
        handleItemModalClose={handleItemModalClose}
      />
      )}
    </Container>
  );
}

export default HomeScreen;
