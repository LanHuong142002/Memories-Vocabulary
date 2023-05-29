import { ChangeEvent, ReactElement } from 'react';

// Styles
import './index.css';

interface SelectItemProps {
  value?: string;
  id?: string;
  name: string;
}

interface SelectProps {
  valueSelected: string;
  name: string;
  options: SelectItemProps[];
  optionAll?: boolean;
  title?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  valueSelected,
  optionAll,
  onChange,
  title,
  name,
  options,
}: SelectProps): ReactElement => (
  <div className={title && 'select-box'} data-testid='select-box'>
    {title && <label className='title-select'>{title}</label>}
    <select className='select-wrapper' name={name} value={valueSelected} onChange={onChange}>
      {optionAll && (
        <option className='select-item' value=''>
          All
        </option>
      )}
      {options.length &&
        options.map(({ id, name }) => (
          <option className='select-item' value={id} key={id}>
            {name}
          </option>
        ))}
    </select>
  </div>
);
