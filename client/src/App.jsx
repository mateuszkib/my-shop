import React, { useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import CategoryForm from "./components/admin/Forms/CategoryForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/layouts/Home";
import { setAuthToken } from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Announcement from "./components/announcement/Announcement";
import AddAnnouncementForm from "./components/announcement/AddAnnouncementForm";

//Redux
import { Provider } from "react-redux";
import store from "./store";

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
                    <Switch>
                        <Navbar />
                        <main>
                            <Route exact path={"/"} component={Home} />
                            <Route
                                exact
                                path="/admin/categories/add"
                                component={CategoryForm}
                            />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/announcement/:category"
                                component={Announcement}
                            />
                            <Route
                                exact
                                path="/announcement/add"
                                component={AddAnnouncementForm}
                            />
                        </main>
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
