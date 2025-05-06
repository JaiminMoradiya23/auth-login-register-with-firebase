'use client'
import React from 'react'
import { getAuth } from 'firebase/auth';

const HomeComp = () => {
    const user = getAuth().currentUser;

    return (
        <>
            <h1 className="text-3xl font-bold text-center text-gray-800">Welcome{user.displayName ? `, ${user.displayName}` : " to Dashboard"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-purple-700 mb-4">Quick Stats</h2>
                    <p className="text-gray-600">Your dashboard content will appear here.</p>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-pink-700 mb-4">Recent Activity</h2>
                    <p className="text-gray-600">Your recent activities will be displayed here.</p>
                </div>
            </div>
        </>
    )
}

export default HomeComp