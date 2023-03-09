import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteItem, listItems } from '../actions/itemAction';
import EditItem from './editItemModal';
// import { useDispatch } from 'react-redux';

function HomeScreen() {
  const [itemVisible, setItemModalShow] = useState(false);
  const [selectedItem, setItemDetails] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [{
    id: '1',
    name: 'test',
    item_code: 'testcode',
    color: 'red',
    price: '100000',
  }, {
    id: '2',
    name: 'test2',
    item_code: 'testcode2',
    color: 'yellow',
    price: '200000',
  }];

  const handleRowClick = (e, row) => {
    navigate(`/item/${row.id}`);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteItem(id));
    }
  };

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  const handleItemModalShow = (item) => {
    setItemModalShow(true);
    setItemDetails(item);
  };

  const handleItemModalClose = () => setItemModalShow(false);

  return (
    <>
      <Container className="mt-5 mb-5">
        <center><h1>All Items</h1></center>
        <Button onClick={() => (navigate('/create'))}>Create Item</Button>
        <br />
        <br />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ITEM CODE</th>
              <th>COLOR</th>
              <th>PRICE</th>
              <th> ACTION</th>
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
      </Container>
      {selectedItem && (
      <EditItem
        itemVisible={itemVisible}
        selectedItem={selectedItem}
        handleWeightModalClose={handleItemModalClose}
      />
      )}

    </>
  );
}

export default HomeScreen;
