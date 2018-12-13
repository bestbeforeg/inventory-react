import React, { Component } from 'react';
import {Router, Switch, Route} from 'react-router-dom'
import Navigation from './components/Navigation/Navigation';
import Details from './components/Details/Details';
import Form from "./components/Form/Form";
import Browse from "./components/Browse/Browse";
import Signin from "./components/Signin/Signin";
import FormCollection from "./components/Form/Collection/FormCollection";
import DetailsCollection from "./components/Details/Collection/DetailsCollection";
import DetailsCategory from "./components/Details/Category/DetailsCategory";
import history from "./components/Utils/History/UtilsHistory";
import './styles/styles.css';

class App extends Component {
  render() {
    return (
        <Router history={history}>
            <div className="App">
                <Navigation/>
                <Switch>
                    <Route path="/details/" component={Details} />
                    <Route exact path="/" component={Form} />
                    <Route exact path="/edit/:type/:id/:name/:parent" component={Form} />
                    <Route path="/browse" component={Browse} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/add/:type/:id/:name/:parent" component={FormCollection} />
                    <Route path="/collection/:type/:id/:name/:parent" component={DetailsCollection} />
                    <Route path="/category/:type/:id/:name/:parent" component={DetailsCategory} />
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
