import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { requireAuth, requireAuthAndAdmin } from './utils/secure';
import * as reducers from './reducers';
import App from './components/App';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Dashboard from './components/secure/Dashboard';
import BookShow from './components/secure/show_book';
import BookEdit from './components/secure/edit_book';
import AuthorEdit from './components/secure/edit_author';
import BookCreate from './components/secure/create_book';
import Profile from './components/secure/Profile';
import UserEdit from './components/secure/edit_user';
import MapDashboard from './components/secure/map_dashboard';
import AuthorCreate from './components/secure/create_author';
import thunk from 'redux-thunk';


const reducer = combineReducers({
	...reducers,
	routing: routerReducer,


});

//noinspection JSUnresolvedVariable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk,routerMiddleware(browserHistory)))
);

const history = syncHistoryWithStore(browserHistory, store);

const secure = requireAuth(store);
const adminOnly = requireAuthAndAdmin(store);

//TODO: SET UP ROUTE FOR ADMINISTRATORS ONLY, AND ADD AN onEnter={adminOnly} to the route
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={App}>
				<IndexRoute component={Home}/>
				<Route path='login' component={Login}/>
				<Route path='register' component={Register}/>
				<Route path='logout' component={Logout}/>
				<Route path='/mapdashboard' component={MapDashboard} onEnter={secure} />
				<Route path='/mapdashboard/author/create' component={AuthorCreate} onEnter={secure} />
				<Route path='/mapdashboard/author/edit/:id' component={AuthorEdit} onEnter={secure} />
				<Route path='/dashboard/books/create' component={BookCreate} onEnter={secure}/>
				<Route path='/dashboard/users/user/:id' component={UserEdit} onEnter={secure} />
				<Route path='/dashboard/books/view/:id' component={BookShow} onEnter={secure}/>
				<Route path='/dashboard/books/edit/:id' component={BookEdit} onEnter={secure}/>
				<Route path='/dashboard' component={Dashboard} onEnter={secure}/>
				<Route path='profile' component={Profile} onEnter={secure}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);