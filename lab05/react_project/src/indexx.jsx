import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import {Menu} from './Menu.jsx'
import Products from "./Products.jsx";
import {Hello} from './Hello.jsx'
import {Home} from './Home.jsx'
import {NoPage} from './NoPage.jsx'
import EditProduct from "./EditProduct.jsx";
import Login from "./Login.jsx"
import { setAuthToken } from "./setAuthToken.jsx";


function App(){
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }

  function hasJWT() {
    let flag = false;

    localStorage.getItem("token") ? flag=true : flag=false
   
    return flag
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<Home/>} />
            <Route path="productlist" element={<Products />} />
            <Route path="hello" element={<Hello />} />
            <Route path="edit" element={<EditProduct />} />
            <Route path="*" element={<NoPage />}  />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App