import { useState, useEffect } from 'react';

interface User {
  name: string;
  age: number;
  address: string;
}

interface Props {
  id: string;
}

export default function User(props: Props) {
  const [user, setUser] = useState<User>({ name: '', age: 0, address: '' });

  async function fetchUserData(id: string) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts' + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div>{user.name}</div>
      <div>{user.age} years old</div>
      <br />
      <div>{user.address}</div>
    </>
  );
}
