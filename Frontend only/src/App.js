import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { Route, NavLink, Link } from 'react-router-dom'
import HomePage from './components/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<HomePage />}> </Route>
          
          {/* ? Might Convert this into a modal */}
          <Route path="/image/:id" element={<h1> Image Page </h1>}> </Route>
          
          <Route path="/favorites" element={<h1> Favorite Images </h1>}>  </Route>
          
          <Route path="/upload" element={<h1> Upload Image </h1>}> </Route>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
