import { ReactElement } from 'react';

// CSS
import './index.css';

const DetailsLayout = ({
  detailsTitle,
  detailsBody,
}: {
  detailsTitle: ReactElement;
  detailsBody: ReactElement;
}) => {
  return (
    <main className='details-page'>
      <div className='details-title'>{detailsTitle}</div>
      <div className='details-body'>{detailsBody}</div>
    </main>
  );
};

export default DetailsLayout;
