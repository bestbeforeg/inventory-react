import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navigation from './components/Navigation/Navigation';
import Details from './components/Details/Details';
import Form from "./components/Form/FormCollection";
import Browse from "./components/Browse/Browse";
import Signin from "./components/Signin/Signin";
import FormCollection from "./components/Form/Collection/FormCollection";
import DetailsCollection from "./components/Details/Collection/DetailsCollection";
import DetailsCategory from "./components/Details/Category/DetailsCategory";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navigation/>
                <Switch>
                    <Route path="/details/" component={Details} />
                    <Route exact path="/" component={Form} />
                    <Route path="/browse" component={Browse} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/add" component={FormCollection} />
                    <Route path="/collection/:id" component={DetailsCollection} />
                    <Route path="/category/:id" component={DetailsCategory} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
