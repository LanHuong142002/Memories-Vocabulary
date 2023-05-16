import { Route, Routes } from 'react-router-dom';

// Styles
import './styles/main.css';

// Pages
import { DetailsPage, HomePage } from '@pages';

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/details/:id' element={<DetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
