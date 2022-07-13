import React from "react";
import { Routes, Route, Link } from 'react-router-dom';


function Main() {
    return(
        <div>
            <p>메인페이지</p>
            <button>
                <Link to="/map">go start</Link>
            </button>
        </div>
    )
}

export default Main;