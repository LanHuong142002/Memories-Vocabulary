import { useEffect, useState } from 'react';

const Counter = () => {
  const [state, setState] = useState({ count: 0 });

  useEffect(() => {
    document.title = `You clicked ${state.count} times`;

    return () => {
      document.title = `You clicked ${state.count} times`;
    };
  });

  const handleClick = () => {
    setState((state) => ({
      count: state.count + 1,
    }));
  };

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Counter;
