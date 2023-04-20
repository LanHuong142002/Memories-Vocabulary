import useStatus from './useStatus';

const BoxExample = () => {
  const { get } = useStatus();
  const { data, error, isLoading } = get();

  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  return <div>123112313123123123</div>;
};

export default BoxExample;
