import React, { useState, useEffect } from "react";
import { formatNumber, formatPercent, formatUSD } from "../../utils/formatUtils";
import axios from "axios";
import Swal from "sweetalert2";

export default function MyCoinCard() {
    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchCoinData() {
            try {
                const token = localStorage.getItem("access_token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coin`, config);
                setCoinData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchCoinData();

    }, []);
    const handleDelete = async (id) => {
        try {
            const response = await axios({
                method: "DELETE",
                url: `${import.meta.env.VITE_API_BASE_URL}/delete-coin/${id}`,
                headers: {
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            });
            setCoinData(coinData.filter(item => item.id !== id));
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
            });
        } catch (error) {
            const errMsg = error.response.data.message
            Swal.fire({
                title: 'Error',
                text: errMsg,
                icon: 'error',
            })
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    {coinData.length === 0 ? (
                        <div className="row justify-content-center">
                            <div className="col-lg-4 mb-4">
                                <div className="card text-center">
                                    <div className="card-body">
                                            <h5 className="card-title">Oops, You haven't added coin data yet</h5>
                                            <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?size=338&ext=jpg&ga=GA1.1.1319243779.1711584000&semt=ais" alt="Oops Icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            {coinData.map((coins) => (
                                <div className="col-lg-4 mb-4" key={coins.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{coins.name}</h5>
                                            <p className="card-text">RANK : {coins.rank}</p>
                                            <p className="card-text">SYMBOL : {coins.symbol}</p>
                                            <p className="card-text">SUPPLY : {formatNumber(coins.supply)}</p>
                                            <p className="card-text">MAX SUPPLY : {coins.maxSupply ? formatNumber(coins.maxSupply) : "N/A"}</p>
                                            <p className="card-text">MARKET CAP USD : {formatUSD(coins.marketCapUsd)}</p>
                                            <p className="card-text">VOLUME USD 24 HOUR : {formatUSD(coins.volumeUsd24Hr)}</p>
                                            <p className="card-text">PRICE USD : {formatUSD(coins.priceUsd)}</p>
                                            <p className="card-text">CHANGE PERCENT 24 HOUR : {formatPercent(coins.changePercent24Hr)}</p>
                                            <p className="card-text">VWAP 24 HOUR : {formatUSD(coins.vwap24Hr)}</p>
                                            <p className="card-text">
                                                EXPLORER : <a href={coins.explorer} target="_blank" rel="noopener noreferrer">Explorer Link</a>
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger" onClick={() => handleDelete(coins.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}
