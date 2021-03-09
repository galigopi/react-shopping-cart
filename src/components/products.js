import React, { Component } from 'react'
import formatCurrency from "../utils";
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions'

class products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    openModal = (product) => {
        this.setState({ product })
    }
    closeModel = (product) => {
        this.setState({ product: null })
    }
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    {!this.props.products ? <div>loading....</div> :
                        <ul className="products">
                            {this.props.products.map((product) => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                            <img src={product.image} alt={product.title}></img>
                                            <p>
                                                {product.title}
                                            </p>
                                        </a>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button className="button primary" onClick={() => this.props.addToCart(product)}>
                                                Add to Cart
                                     </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    }
                </Fade>
                {product &&
                    <Modal isOpen={true} onRequestClose={this.closeModel}>
                        <Zoom>
                            <button className="close-model" onClick={this.closeModel} >X</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        {product.description}
                                    </p>
                                    <p>
                                        Available Sizes  {" "}
                                        {product.availableSizes.map((x) => (
                                            <span>{" "} <button className="button">{x}</button></span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button className="button primary" onClick={() => {
                                            this.props.addToCart(product);
                                            this.closeModel();
                                        }
                                        }> Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>}
            </div>
        )
    }
}

export default connect((state) => ({ products: state.products.filteredItems }), { fetchProducts })(products);