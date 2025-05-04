import Header from "./Components/Header";
import HomeComp from "./Components/Home";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function Home() {

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-pink-500">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
            <div className="flex flex-col gap-8">
              <HomeComp />
            </div>
          </div>
        </main>
      </div >
    </ProtectedRoute >
  );
}
