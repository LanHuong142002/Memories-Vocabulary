import { useEffect } from 'react';

export default function Card(props: { onSelect: (test: any) => void }) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [props.onSelect]);

  return (
    <>
      {[1, 2, 3, 4].map((choice) => (
        <button key={choice} data-testid={choice} onClick={() => props.onSelect(choice)}>
          {choice}
        </button>
      ))}
    </>
  );
}
