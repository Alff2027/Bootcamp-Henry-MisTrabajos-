
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home'
import Recipe from './components/Recipe/Recipe.jsx'
import './styles/App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />} />
      <Route path='/recipes/:id' element={<Recipe />} />
    </Routes>
  );
}

export default App;
