import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Morphology from './pages/Morphology';
import Nutrition from './pages/Nutrition';
import Population from './pages/Population';
import Photo from './pages/Photo';
import Search from './pages/Search';
import { SearchProvider } from './context/SearchContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="d-flex flex-column vh-100"> {/* Головний Flexbox-контейнер */}
          
          {/* HEADER: Фіксований блок зверху */}
          <header className="flex-shrink-0">
            <Header />
          </header>

          {/* MAIN: Прокручуваний вміст сторінок */}
          <main className="flex-grow-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/morphology" element={<Morphology />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/population" element={<Population />} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>

          {/* FOOTER: Фіксований блок знизу */}
          <footer className="flex-shrink-0">
            <Footer />
          </footer>

        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;