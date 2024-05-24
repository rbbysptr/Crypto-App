import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import CoinCard from "../component/CoinCardComponent/CoinCard";
import Sidebar from "./SidebarPage";

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [allCoin, setCoin] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(9);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBy, setFilterBy] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    async function fetchCoin() {
        try {
            const response = await axios({
                method: "GET",
                url: "https://api.coincap.io/v2/assets"
            })
            setCoin(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCoin();
    }, []);

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;

    let filteredCoins = allCoin;
    if (filterBy === "lowest") {
        filteredCoins = allCoin.sort((a, b) => a.rank - b.rank);
    } else if (filterBy === "highest") {
        filteredCoins = allCoin.sort((a, b) => b.rank - a.rank);
    }

    const currentCoins = filteredCoins
        .filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(indexOfFirstCoin, indexOfLastCoin);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

   
    const handleFilterChange = (event) => {
        setFilterBy(event.target.value);
        setCurrentPage(1); 
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

   return (
       <div className={`container-fluid ${darkMode ? 'bg-dark text-light' : ''}`}>
        <div className="row">
            <Sidebar />
            <div className="col-md-9 col-lg-10">
                <section className="container-fluid" id="home-section">
                       <div className="d-flex justify-content-between align-items-center mb-3">
                           <button className="btn btn-warning" onClick={toggleDarkMode}>
                               {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                           </button>
                       </div>
                       <h1>CRYPTO LIST</h1>
                    <div className="mb-3 d-flex justify-content-between">
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div>
                            <select className="form-select" onChange={handleFilterChange} value={filterBy}>
                                <option value="">Filter by rank</option>
                                <option value="lowest">Lowest Rank</option>
                                <option value="highest">Highest Rank</option>
                            </select>
                        </div>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {filteredCoins.length > 0 ? (
                                <div className="row">
                                    {currentCoins.map((coin) => (
                                        <CoinCard key={coin.id} coin={coin} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img src="path_to_your_oops_image" alt="Oops" />
                                    <p>Data not found</p>
                                </div>
                            )}
                            <nav className="d-flex justify-content-center">
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(filteredCoins.length / coinsPerPage) }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button type="button" onClick={() => paginate(i + 1)} className={`page-link ${currentPage !== i + 1 ? 'text-muted' : ''}`}>{i + 1}</button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </>
                    )}
                </section>
            </div>
        </div>
    </div>
);

}
