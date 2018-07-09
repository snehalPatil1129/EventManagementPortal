import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter ,HashRouter ,Route} from 'react-router-dom';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss';
import '../scss/core/_dropdown-menu-right.scss';
import App from './containers/App/'

const app = (
  <HashRouter>
    <Route path="/" component={App} />
  </HashRouter>
);

ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();
// ReactDOM.render((
//   <HashRouter>
//     <Switch>
//       <Route path="/" name="Home" component={App}/>
//     </Switch>
//   </HashRouter>
// ), document.getElementById('root'));
