import React from 'react'
import SignupForm from '@/Components/SignupForm'
import AuthRoute from '@/Components/AuthRoute'
import LoginMethods from '@/Components/LoginMethods'

const Signup = () => {
    return (
        <AuthRoute>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                    <SignupForm />
                    <div className="relative my-3">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                    </div>
                    <LoginMethods />
                </div>
            </div>
        </AuthRoute>
    )
}

export default Signup