import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./views/Upload";
import App from './App.js';


export default function Routing() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="/" element={<App />} />
                </Route>
            </Routes>
        </BrowserRouter>

    )



}
ReactDOM.render(<Routing />, document.getElementById('root'));
