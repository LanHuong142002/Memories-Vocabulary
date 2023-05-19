// Styles
import './styles/main.css';

// Pages
import { DetailsPage, HomePage } from '@pages';

const App = () => {
  return (
    <div className='container'>
      <HomePage />
      <DetailsPage />
    </div>
  );
};

export default App;
