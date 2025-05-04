'use client';
import { auth } from '@/firebase/firebaseClient';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out!')
      router.push('/login');
    } catch (error) {
      toast.error('')
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="w-full py-4 px-6 bg-white/90 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My App
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
} 