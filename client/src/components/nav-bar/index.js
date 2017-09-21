import React from 'react';
import style from './nav-bar.scss';

import NavLink from './nav-link';
import NavLinksLeft from './nav-links-left';
import NavLinksRigth from './nav-links-right';


class NavBar extends React.Component {
	render() {
		return (
			<div className={style['wrapper']}>
				{this.props.children}
			</div>
		)
	}
} 

export default NavBar;