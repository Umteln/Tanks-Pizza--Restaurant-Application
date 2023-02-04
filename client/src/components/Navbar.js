import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { CartContext } from '../utils/cartContext';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import ReorderIcon from '@mui/icons-material/Reorder';

const Navbar = () => {
	const { openLinks, setOpenLinks } = useContext(CartContext);
	const cart = useContext(CartContext);

	const productsCount = cart.items.reduce(
		(sum, product) => sum + product.quantity,
		0
	);

	return (
		<div className='navbar'>
			<div
				className='leftSide'
				id={openLinks ? 'open' : 'close'}
			>
				<img
					src={logo}
					alt='pizza logo'
				/>
				<div className='hiddenLinks'>
					<Link to='/'>Home</Link>
					<Link to='/menu'>Menu</Link>
					<Link to='/about'>About</Link>
					<Link to='/contact'>Contact</Link>
					<Link to='/cart'> Cart ({productsCount})</Link>
				</div>
			</div>

			<div className='rightSide'>
				<Link to='/'>Home</Link>
				<Link to='/menu'>Menu</Link>
				<Link to='/about'>About</Link>
				<Link to='/contact'>Contact</Link>
				<Link to='/cart'>Cart ({productsCount})</Link>
				<button onClick={() => setOpenLinks((prev) => !prev)}>
					<ReorderIcon />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
