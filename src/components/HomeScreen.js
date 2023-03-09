import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
// import { useDispatch } from 'react-redux';

function HomeScreen() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);
  const navigate = useNavigate();

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

  return (
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
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr onClick={(e) => handleRowClick(e, item)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.item_code}</td>
              <td>{item.color}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default HomeScreen;
