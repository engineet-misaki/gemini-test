import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="container mx-auto p-4 text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">TODO Appへようこそ</h1>
      <p className="text-lg mb-8">下のボタンをクリックして、TODOリストを開始してください。</p>
      <Link href="/todos" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl">
        TODOリストを見る
      </Link>
    </main>
  );
}
