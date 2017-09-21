import React from 'react';
import style from './nav-links-left.scss';


class NavLinksLeft extends React.Component {
	render() {
		return (
			<div className={style['nav-wrap']}>
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
} 

export default NavLinksLeft;