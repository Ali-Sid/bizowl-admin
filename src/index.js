import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import Login from 'Auth/Login';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			{/* <ThemeEditorProvider> */}
				{/* <HashRouter> */}
					<Router>
					<Switch>
						{/*<Route path='/login' component={Login} />*/}
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RtlLayout} />
						{/*<Redirect from='/' to='/login' />*/}
						 <Redirect from='/' to='/admin' />
					</Switch>
					</Router>
				{/* </HashRouter> */}
			{/* </ThemeEditorProvider> */}
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
