import './App.css';
import MenuLinkWrapper from "./components/menu-link/MenuLink";
import RouteWrapper from "./components/route-wraper";
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import { mockData } from "./mockData";

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <div className='sidebar'>
          <MenuLinkWrapper data={mockData}/>
        </div>

        <div className='main'>
          <RouteWrapper pages={mockData}/>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
