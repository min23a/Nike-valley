import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import Checkout from './Components/Checkout/Checkout';
import Admin from './Components/Admin/Admin';
import Addproduct from './Components/AddProduct/Addproduct';
import ManageProduct from './Components/ManageProduct/ManageProduct';

export const dataContext = createContext();

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    hasValue: false
  });
  const [Locate,setLocate] = useState();
  const [productID,setProductID] = useState({})
  return (
    <dataContext.Provider value={{ users: [user, setUser], id: [productID, setProductID],local : [Locate,setLocate]}}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/checkout/:id">
            <Checkout/>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/addProduct">
            <Addproduct />
          </PrivateRoute>
          <PrivateRoute path="/manageProduct">
            <ManageProduct />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </dataContext.Provider>
    
  );
}

export default App;
