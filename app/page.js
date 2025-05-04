
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-pink-500">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center">
            Welcome to the Home Page
          </h2>
        </div>
      </main>
    </div >
  );
}
