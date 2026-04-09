import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RecordsBrowser from './pages/RecordsBrowser';
import SpeciesDetail from './pages/SpeciesDetail';
import Leaderboards from './pages/Leaderboards';
import About from './pages/About';
import worldRecordsData from './data/world_records.json';
import countriesData from './data/countries.json';

function App() {
  const records = worldRecordsData.records;
  const countries = countriesData;

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage records={records} />} />
            <Route
              path="/records"
              element={<RecordsBrowser records={records} countries={countries} />}
            />
            <Route
              path="/species/:slug"
              element={<SpeciesDetail records={records} />}
            />
            <Route path="/leaderboards" element={<Leaderboards records={records} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
