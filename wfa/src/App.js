import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home'; 

function App() {
  return (
    <div className="App">
      	<BrowserRouter>
	      	<Switch>
	        	<Route exact path="/" component={Home} />
	       	</Switch>
       	</BrowserRouter>
    </div>
  );
}

export default App;
