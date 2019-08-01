import React, { useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import CategoryForm from "./components/admin/Forms/CategoryForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/layouts/Home";
import { setAuthToken } from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Announcement from "./components/announcement/Announcements";
import AddAnnouncementForm from "./components/announcement/AddAnnouncementForm";
import { PrivateRoute } from "./components/helpers/PrivateRoute";

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
                    <Navbar />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <main>
                        <Route exact path={"/"} component={Home} />
                        <Route
                            exact
                            path="/announcements/:category"
                            component={Announcement}
                        />
                        <PrivateRoute
                            exact
                            path="/admin/categories/add"
                            component={CategoryForm}
                        />
                        <PrivateRoute
                            path="/announcement/:category/add"
                            component={AddAnnouncementForm}
                        />
                    </main>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
