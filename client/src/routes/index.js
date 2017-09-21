import React from 'react';
import ReactDOM from 'react-dom';

import Wrapper from '../components/wrapper/index.js';
import NavBar from '../components/nav-bar/index.js';
import NavBarRight from '../components/nav-bar/nav-links-right/index.js';
import NavBarLeft from '../components/nav-bar/nav-links-left/index.js';
import NavLinks from '../components/nav-bar/nav-link/index.js';

class App extends React.Component {
	render() {
		return (
			<Wrapper>
				<NavBar>
					<NavBarLeft>
						<NavLinks to={"/"} text={"Главная"} />
						<NavLinks to={"/chat"} text={"Чат"} />
					</NavBarLeft>
					<NavBarRight>
						<NavLinks to={"/login"} text={"Войти"} />
					</NavBarRight>
				</NavBar>
			</Wrapper>
			);
	}
}

 


ReactDOM.render(
	<App />,
	document.getElementById('container')
);