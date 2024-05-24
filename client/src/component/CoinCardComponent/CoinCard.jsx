import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatNumber, formatPercent, formatUSD } from "../../utils/formatUtils";
import Swal from "sweetalert2";

export default function CoinCard({ coin }) {
    const [chart, setChart] = useState([]);
    const navigate = useNavigate();

    const handleAdd = async (id) => {
        try {
            const responses = await axios.get(`https://api.coincap.io/v2/assets`);
            const coinData = responses.data.data;
            const selectedCoin = coinData.find(coin => coin.id === id);

            if (!selectedCoin) {
                console.error('Koin tidak ditemukan');
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/add-coin/${id}`, selectedCoin,
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
            });
            navigate('/CardPage');
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
        <div className="card" style={{ width: "20rem", margin: "1rem" }} key={coin.id}>
            <div className="card-body" >
                <div className="card-body" >
                    <h5 className="card-title">{coin.name}</h5>
                    <p className="card-text">RANK : {coin.rank}</p>
                    <p className="card-text">SYMBOL : {coin.symbol}</p>
                    <p className="card-text">SUPPLY : {formatNumber(coin.supply)}</p>
                    <p className="card-text">MAX SUPPLY : {coin.maxSupply ? formatNumber(coin.maxSupply) : "N/A"}</p>
                    <p className="card-text">MARKET CAP USD : {formatUSD(coin.marketCapUsd)}</p>
                    <p className="card-text">VOLUME USD 24 HOUR : {formatUSD(coin.volumeUsd24Hr)}</p>
                    <p className="card-text">PRICE USD : {formatUSD(coin.priceUsd)}</p>
                    <p className="card-text">CHANGE PERCENT 24 HOUR : {formatPercent(coin.changePercent24Hr)}</p>
                    <p className="card-text">VWAP 24 HOUR : {formatUSD(coin.vwap24Hr)}</p>
                    <p className="card-text">
                        EXPLORER : <a href={coin.explorer} target="_blank" rel="noopener noreferrer">Explorer Link</a>
                    </p>
                    <button className="btn btn-light border-dark" onClick={() => handleAdd(coin.id)}>Choose Coin </button>
                </div>
            </div>
        </div>
    );
}
