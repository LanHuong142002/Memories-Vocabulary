import { ChangeEvent, ReactElement } from 'react';

// Styles
import './index.css';

interface SelectItemProps {
  value?: string;
  id?: string;
  name: string;
}

interface SelectProps {
  optionAll?: boolean;
  valueSelected: string;
  name: string;
  title?: string;
  options: SelectItemProps[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  optionAll,
  valueSelected,
  name,
  title,
  options,
  onChange,
}: SelectProps): ReactElement => (
  <div className={title && 'select-box'} data-testid='select-box'>
    {title && <label className='title-select'>{title}</label>}
    <select className='select-wrapper' name={name} value={valueSelected} onChange={onChange}>
      {optionAll && (
        <option className='select-item' value=''>
          All
        </option>
      )}
      {Array.isArray(options) &&
        options.length &&
        options.map(({ id, name }) => (
          <option className='select-item' value={id} key={id}>
            {name}
          </option>
        ))}
    </select>
  </div>
);
