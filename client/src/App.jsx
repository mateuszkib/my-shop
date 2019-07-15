import React, {useEffect} from "react";
import Navbar from "./components/layouts/Navbar";
import CategoryForm from "./components/admin/Forms/CategoryForm";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/layouts/Home';
import {setAuthToken} from './utils/setAuthToken';
import {loadUser} from "./actions/auth";

//Redux
import {Provider} from 'react-redux';
import store from './store';

function App() {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Navbar/>
                    <main>
                        <Route exact path={'/'} component={Home}/>
                        <Route exact path="/admin/categories/add" component={CategoryForm}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                    </main>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
