import { useUser } from './reuseable';

const User = () => {
  const { users, isLoading, isError } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <p>Oops, something wrong!</p>;
  return users.map((item) => {
    return <p>{item.name}</p>;
  });
};

export default User;
