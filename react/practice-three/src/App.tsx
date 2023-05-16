// Styles
import { DetailsPage } from '@pages';
import './styles/main.css';

// Pages
import { HomePage } from '@pages';

const App = () => {
  return (
    <div className='container'>
      {/* <HomePage /> */}
      <DetailsPage />
    </div>
  );
};

export default App;
