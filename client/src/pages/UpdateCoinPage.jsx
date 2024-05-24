import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import UpdateCoinForm from "../component/UpdateCoinComponent/UpdateCoinForm";

export default function UpdateCoinPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const [formData, setFormData] = useState({
        rank: "",
        symbol: "",
        name: "",
        supply: "",
        maxSupply: "",
        marketCapUsd: "",
        volumeUsd24Hr: "",
        priceUsd: "",
        changePercent24Hr: "",
        vwap24Hr: "",
        explorer: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/${params.id}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                const errMsg = error.response.data.message
                Swal.fire({
                    title: 'Error',
                    text: errMsg,
                    icon: 'error',
                })
            }
        };
        fetchData();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios({
                method: "PUT",
                url: `${import.meta.env.VITE_API_BASE_URL}/update-cart/${params.id}`,
                data: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                }
            });
            console.log(response.data);
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
            });
            navigate('/CardPage');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const errMsg = error.response.data.message
            Swal.fire({
                title: 'Error',
                text: errMsg,
                icon: 'error',
            })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-posts-section">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Update Coin</h1>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <UpdateCoinForm
                                formData={formData}
                                loading={loading}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
