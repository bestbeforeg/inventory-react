import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navigation from './components/Navigation/Navigation';
import Details from './components/Details/Details';
import Form from "./components/Form/Form";
import Browse from "./components/Browse/Browse";
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <CssBaseline />
                <Navigation/>
                <Switch>
                    <Route path="/details/:id" component={Details} />
                    <Route exact path="/" component={Form} />
                    <Route path="/browse" component={Browse} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
