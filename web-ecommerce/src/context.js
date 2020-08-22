import React, { Component } from 'react'
import { storeProducts, detailProduct} from './data';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products:[],
        detailProduct: detailProduct,
        cart: storeProducts,
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    };  
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () =>{
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];

        })
        this.setState(()=>{
            return {products:tempProducts}
        })
    };
    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDatail = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product};
        });
    };
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {products: tempProducts, cart:[...this.state.cart], product};
        }, ()=>{
            console.log(this.state);
        });
    };

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProdact:product,modalOpen:true}
        });
    }
    closeModal = () => {
        this.setState(()=>{
            return {modalOpen:false}
        })
    }
    increment = (id) =>{
        console.log('this is increment method');
    }
    decrement = (id) =>{
        console.log('this is decrement method');
    }
    remomveItem = (id) => {
        console.log('this is removeitem method');
    }
    clearCart = (id) => {
        console.log('this is clearcart method');
    }
    
    render() {
        return (
            <ProductContext.Provider 
            value={{
                ...this.state,
                handleDatail: this.handleDatail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                remomveItem: this.remomveItem,
                clearCart: this.clearCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};