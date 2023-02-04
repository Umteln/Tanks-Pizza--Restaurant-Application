import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../utils/cartContext';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import '../styles/CartItem.css';

const Cart = () => {
	const [firstLoad, setFirstLoad] = useState(true);
	const { getTotalCost, setCartProducts, cartProducts } =
		useContext(CartContext);
	const total = getTotalCost();

	useEffect(() => {
		if (firstLoad) {
			const storedCart = localStorage.getItem('cart');
			const parsedStoredCart = JSON.parse(storedCart);
			setCartProducts(parsedStoredCart);
			setFirstLoad(false);
		}
	}, [firstLoad, setCartProducts]);

	const checkout = async () => {
		let items = cartProducts.filter((product) => product.quantity !== 0);
		await fetch('http://localhost:4000/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ items: items }),
		})
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (response.url) {
					window.location.assign(response.url); // Forwarding user to Stripe
				}
			});
	};

	return (
		<div className='cart'>
			<h1 className='cartTitle'>Your Cart Items</h1>
			<div className='cartList'>
				{cartProducts.map((product) =>
					product.quantity !== 0 ? (
						<CartItem
							key={product.id}
							product={product}
						/>
					) : (
						''
					)
				)}
			</div>
			<h2>Total: ${total}</h2>
			<div className='checkout'>
				<Link to='/menu'>
					<button>Add More</button>
				</Link>

				<button onClick={checkout}>Checkout</button>
			</div>
		</div>
	);
};

export default Cart;
