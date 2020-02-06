import React, { Component } from 'react';
import Header from './Components/Header';
import Post from "./Components/Post";
import Footer from "./Components/Footer";

class App extends Component {

    render() {

        return (
            <div className="App">
                <Header />
                <Post />
                <Footer />
            </div>
        );
    }
}

export default App;
