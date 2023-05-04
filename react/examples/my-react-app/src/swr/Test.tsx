import useSWR, { SWRConfig } from 'swr';

function Dashboard() {
  const { data: events } = useSWR('/api/events');
  const { data: projects } = useSWR('/api/projects');
  const { data: user } = useSWR('/api/user', { refreshInterval: 0 }); // override, and this API wont refresh because refreshInterval =0

  return <div>Dashboard</div>;
}

function TestSWR() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000, // This gonna make all the useSWR in this Dashboard component refresh after 3s
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Dashboard />
    </SWRConfig>
  );
}

export { TestSWR };
