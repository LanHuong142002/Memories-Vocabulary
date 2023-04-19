import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeProvider';

const Testss = () => {
  const value = ['123', '2323'];
  const context = useContext(ThemeContext);
  const { data, setData } = context;

  useEffect(() => {
    // fetch
    setData(value);
  }, []);

  return (
    <ul>
      {data.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

export { Testss };
