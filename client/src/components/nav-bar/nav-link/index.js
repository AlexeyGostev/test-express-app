import React from 'react';
import style from './nav-link.scss';


class NavLink extends React.Component {
	render() {
		return (
			<li className={style['nav-items']}>
				<a href={this.props.to} className={style['nav-link']}>{this.props.text} </a>
			</li>
		)
	}
} 

export default NavLink;