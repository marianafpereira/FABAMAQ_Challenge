import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={UserList} />
                    <Route path="/users/:id" component={UserDetails} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
