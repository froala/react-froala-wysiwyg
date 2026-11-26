'use client';
import dynamic from 'next/dynamic';

const FroalaClient = dynamic(() => import('./FroalaClient'), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});

export default function Editor() {
  return <FroalaClient />;
}
