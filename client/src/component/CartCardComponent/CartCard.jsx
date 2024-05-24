import React, { useState, useEffect } from "react";
import { formatNumber, formatPercent, formatUSD } from "../../utils/formatUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function CartCard() {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCartData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart`);
                setCartData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to fetch cart data',
                    icon: 'error',
                });
            }
        }
        fetchCartData();
    }, []);

    const handleAdd = async (id) => {
        try {
            const responses = await axios.get(`https://api.coincap.io/v2/assets`);
            const coinData = responses.data.data;
            const selectedCoin = coinData.find(coin => coin.id === id);

            if (!selectedCoin) {
                console.error('Coin Invalid');
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/add-coin/${id}`, selectedCoin, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
            });
            navigate('/MyCoinPage');
        } catch (error) {
            const errMsg = error.response ? error.response.data.message : 'Failed to add coin';
            Swal.fire({
                title: 'Error',
                text: errMsg,
                icon: 'error',
            });
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-cart/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios({
                method: "DELETE",
                url: `${import.meta.env.VITE_API_BASE_URL}/delete-cart/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                }
            });
            setCartData(cartData.filter(item => item.id !== id));
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
            });
        } catch (error) {
            const errMsg = error.response ? error.response.data.message : 'Failed to delete item';
            Swal.fire({
                title: 'Error',
                text: errMsg,
                icon: 'error',
            });
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    {cartData.length === 0 ? (
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
                        <div className="container">
                            <div className="row justify-content-center">
                                {cartData.map((coin) => (
                                    <div className="col-lg-4 mb-4" key={coin.id}>
                                        <div className="card">
                                            <div className="card-body">
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
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-light mr-2 border" onClick={() => handleAdd(coin.id)}>Add My Coin</button>
                                                <button className="btn btn-info mr-2" onClick={() => handleEdit(coin.id)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(coin.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
