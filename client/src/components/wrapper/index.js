import React from 'react';
import style from './wrapper.scss';


class Wrapper extends React.Component {
	render() { 
		return (
			<div className={style['app']}>
				{this.props.children}
			</div>
			);
	}
} 

export default Wrapper;