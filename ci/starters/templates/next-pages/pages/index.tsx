import dynamic from 'next/dynamic';

const FroalaClient = dynamic(() => import('../components/FroalaClient'), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});

export default function Home() {
  return (
    <main>
      <FroalaClient />
    </main>
  );
}
