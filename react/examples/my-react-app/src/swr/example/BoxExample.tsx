import { useStatus } from './useStatus';

const BoxExample = () => {
  const { data, error, isLoading } = useStatus();

  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  return <div>123112313123123123</div>;
};

export default BoxExample;
