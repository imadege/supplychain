import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateItem from './components/addItem';
import AddEventItem from './components/AddEventItem';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import SingleItem from './components/SingleItem';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {userInfo ? (
              <>
                <Route path="/" element={<HomeScreen />} exact />
                <Route path="/item/:id" element={<SingleItem />} exact />
                <Route path="/create/item" element={<CreateItem />} exact />
                <Route path="/create/event" element={<AddEventItem />} exact />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginScreen />} exact />
                <Route path="/register" element={<RegisterScreen />} exact />
              </>
            )}

          </Routes>
        </Container>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
