import React, { Component } from 'react';
// import './NotFound.css'
import { Link } from 'react-router-dom';

export class NotFound extends Component {
    render() {
        return (
            <div className="spec1 flex w-screen justify-center items-center" style={{
                height: 'calc(100vh - 68px)'
            }}>
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-black-800">404</h1>
                    <p className="text-4xl pb-8 px-12 font-medium">You are lost.</p>
                    <p className="text-4xl pb-8 px-12 font-medium">Come back to home.</p>
                    <Link to="/" className="bg-black hover:bg-white transition-all border-black border-2 duration-500 text-white hover:text-black font-semibold px-6 py-3 rounded-sm">
                    Back to Home
                    </Link>
                </div>
            </div>
        )
    }
}

