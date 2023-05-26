import { ReactElement } from 'react';

// CSS
import './index.css';

export const DetailsLayout = ({
  detailsTitle,
  detailsBody,
}: {
  detailsTitle: ReactElement;
  detailsBody: ReactElement;
}) => (
  <main className='details-page'>
    <div className='details-title'>{detailsTitle}</div>
    <div className='details-body'>{detailsBody}</div>
  </main>
);
