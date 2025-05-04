'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import GoogleLogo from "@/assetes/svg/GoogleLogo.svg";
import { signInWithGoogle } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

const LoginMethods = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await toast.promise(
                signInWithGoogle(),
                {
                    loading: 'Signing in...',
                    success: 'Successfully logged in!',
                    error: (err) => err.message
                }
            );
            const user = getAuth().currentUser;
            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSignIn}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm hover:bg-gray-50 transition text-gray-700 font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center text-gray-700">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                </span>
            ) : (
                <>
                    <span className="w-5 h-5 mr-1 flex items-center justify-center">
                        <Image src={GoogleLogo} alt="Google Logo" width={20} height={20} />
                    </span>
                    Continue with Google
                </>
            )}
        </button>
    )
}

export default LoginMethods