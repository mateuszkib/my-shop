import React from 'react';
import Navbar from './components/layouts/Navbar';
import CategoryForm from './components/admin/Forms/CategoryForm';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <main>
                    <Route exact path="/categories/add" component={CategoryForm}/>
                </main>
            </Router>
        </div>
    );
}

export default App;
