import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" id="sidebar-menu">
            <div className="position-sticky pt-3" style={{ height: "100vh", overflowY: "auto" }}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link" style={{ color: 'black' }} href="/MyCoinPage" id="nav-rates">
                            <FontAwesomeIcon icon={faCoins} className="me-2" />My COIN
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
