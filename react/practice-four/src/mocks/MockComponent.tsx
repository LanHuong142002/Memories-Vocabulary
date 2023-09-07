import { Topic, Vocabulary } from '@interfaces';

export const MockSuccessComponent = ({
  items,
  onClick,
}: {
  items: Vocabulary[] | Topic[];
  onClick: () => void;
}) => (
  <div>
    <div data-testid='items'>
      {items.map((item, index) => (
        <p key={`item-${index}`}>{item.id}</p>
      ))}
    </div>
    <button name='Submit' onClick={onClick} data-testid='button-action' />
  </div>
);

export const MockFailureComponent = ({
  error,
  onClick,
}: {
  error: string;
  onClick: () => void;
}) => (
  <div>
    <p>{error}</p>
    <button name='Submit' onClick={onClick} data-testid='button-action' />
  </div>
);
