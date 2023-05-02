import Input from '@/components/Input'
import React, { use, useState } from 'react'

const Auth = () => { 
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [variant,setVariant] = useState('');

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
            <nav className="px-12 py-5">
                <img src="/images/logo.png" alt="" className="h-12" />
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70px px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        Sign in
                    </h2>
                    <div className="flex flex-col gap-4">
                    <Input 
                        label="username"
                        id="name"
                        onChange={(ev:any) => setName(ev.target.value)}
                        value={name}
                        />
                    <Input 
                        label="email"
                        type="email"
                        id="email"
                        onChange={(ev: any) => setEmail(ev.target.value)}
                        value={email}
                        />
                        <Input 
                        label="password"
                        type="password"
                        id="password"
                        onChange={(ev: any) => setPassword(ev.target.value)}
                        value={password}
                        />
                    </div>
                    <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                        Login
                    </button>
                    <p className="text-neutral-500 mt-12">
                        First time boi? 
                        <span className="text-white ml-1 hover:underline cursor-pointer"> Create Account</span>
                    </p>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Auth;