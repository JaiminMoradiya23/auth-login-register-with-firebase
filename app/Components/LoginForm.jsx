'use client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { signInWithEmailAndPassword } from '@/firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { toastStyle } from '../utilities/helpers'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm()

    const formFields = [
        {
            name: "email",
            label: "Email",
            type: "email",
            validation: {
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                }
            },
            icon: <Mail className="w-5 h-5" />
        },
        {
            name: "password",
            label: "Password",
            type: showPassword ? "text" : "password",
            validation: {
                required: "Password is required",
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                }
            },
            icon: <Lock className="w-5 h-5" />,
            hasToggle: true
        }
    ]

    const handleEmailLogin = async (data) => {
        try {
            await signInWithEmailAndPassword(data.email, data.password);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await toast.promise(
                handleEmailLogin(data),
                {
                    loading: 'Signing in...',
                    success: 'Successfully logged in!',
                    error: (err) => err.message.includes('auth/invalid-credential') ? 'Invalid Credentials' : err.message
                }
            );
            router.push('/');
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getPasswordStrength = (password) => {
        if (!password) return 0
        let strength = 0
        if (password.length >= 6) strength += 1
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1
        if (password.match(/\d/)) strength += 1
        if (password.match(/[^a-zA-Z\d]/)) strength += 1
        return strength
    }

    const passwordStrength = getPasswordStrength(watch("password"))

    return (
        <>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formFields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="flex items-end gap-2 text-sm font-medium text-gray-700 mb-1">
                            {field.icon} {field.label}
                        </label>
                        <div className="relative">
                            <input
                                id={field.name}
                                type={field.type}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                {...register(field.name, field.validation)}
                            />
                            {field.hasToggle && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            )}
                        </div>
                        {errors[field.name] && (
                            <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
                        )}
                        {/* {field.name === "password" && watch("password") && (
                            <div className="mt-2">
                                <div className="flex gap-1 h-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-full ${i < passwordStrength
                                                ? passwordStrength === 1
                                                    ? "bg-red-500"
                                                    : passwordStrength === 2
                                                        ? "bg-yellow-500"
                                                        : passwordStrength === 3
                                                            ? "bg-blue-500"
                                                            : "bg-green-500"
                                                : "bg-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs mt-1 text-gray-500">
                                    {passwordStrength === 0
                                        ? "Enter a password"
                                        : passwordStrength === 1
                                            ? "Weak"
                                            : passwordStrength === 2
                                                ? "Fair"
                                                : passwordStrength === 3
                                                    ? "Good"
                                                    : "Strong"}
                                </p>
                            </div>
                        )} */}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${isLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-purple-700"
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                    Sign up
                </Link>
            </p>
        </>
    )
}

export default LoginForm