import React from 'react';
import Button from '../ButtonComponent/Button';

const UpdateCoinForm = ({ formData, loading, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} id="coin-form">
            <div className="mb-3">
                <label htmlFor="p-rank">
                    Rank <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-rank"
                    placeholder="Enter rank"
                    name='rank'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.rank}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-symbol">
                    Symbol <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-symbol"
                    placeholder="Enter symbol"
                    name='symbol'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.symbol}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-name">
                    Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-name"
                    placeholder="Enter name"
                    name='name'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.name}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-supply">
                    Supply <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-supply"
                    placeholder="Enter supply"
                    name='supply'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.supply}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-maxSupply">
                    Max Supply <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-maxSupply"
                    placeholder="Enter maxSupply"
                    name='maxSupply'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.maxSupply}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-marketCapUsd">
                    Market Cap USD <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-marketCapUsd"
                    placeholder="Enter marketCapUsd"
                    name='marketCapUsd'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.marketCapUsd}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-volumeUsd24Hr">
                    Volume USD 24hr <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-volumeUsd24Hr"
                    placeholder="Enter volumeUsd24Hr"
                    name='volumeUsd24Hr'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.volumeUsd24Hr}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-priceUsd">
                    Price USD <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-priceUsd"
                    placeholder="Enter priceUsd"
                    name='priceUsd'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.priceUsd}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-changePercent24Hr">
                    Change Percent 24hr <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-changePercent24Hr"
                    placeholder="Enter changePercent24Hr"
                    name='changePercent24Hr'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.changePercent24Hr}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-vwap24Hr">
                    VWAP 24hr <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-vwap24Hr"
                    placeholder="Enter vwap24Hr"
                    name='vwap24Hr'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.vwap24Hr}
                    autoComplete="off"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="p-explorer">
                    Explorer <span className="text-danger fw-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cart-explorer"
                    placeholder="Enter explorer"
                    name='explorer'
                    disabled={loading}
                    onChange={handleChange}
                    value={formData.explorer}
                    autoComplete="off"
                    required
                />
            </div>
            <a className="btn btn-lg btn rounded-pill p-2" href="/CardPage">
                Cancel
            </a>
            <Button
                name="Submit"
                buttonClass={"btn btn-lg btn-secondary rounded-pill border"}
                buttonType={"submit"}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Submit'}
            </Button>
        </form>
    );
}

export default UpdateCoinForm;

