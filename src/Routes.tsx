import Search from 'pages/Search';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Home from './pages/Home';

const Routes = () => (
    <BrowserRouter>
      <Navbar/>
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
        </Switch>
        <Switch>
            <Route path="/search">
                <Search />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes; 