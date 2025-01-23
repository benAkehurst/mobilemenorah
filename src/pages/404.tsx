import Link from 'next/link';

export default function Custom404() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start" p-4 bg-slate-100`}
    >
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go Home</Link>
    </main>
  );
}
