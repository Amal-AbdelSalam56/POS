import React from 'react';
import logo from '../../assets/logo.png';

function Login() {
    return (
        <div className="flex justify-center items-center h-screen bg-[#F5F6FA]">
            <div className="text-center bg-[#ffff] w-[501px] p-[50px] rounded-[16px]">
                <img src={logo} alt="Logo" className="w-25 h-25 mx-auto" />
                <h1 className="text-xl mt-6">مرحبا بك</h1>
                <div className="mt-6 ">
                    <label htmlFor="email" className="block mb-2 text-right mr-[3rem]">البريد الالكتروني</label>
                    <input type="email" id="email" placeholder='xxx@xxxx.com' className="w-[358px] py-2 px-4 border border-[#C2C7D0] rounded bg-white" />
                </div>
                <div className="mt-4  ">
                    <label htmlFor="password" className="block mb-2 text-right mr-[3rem]">كلمة المرور</label>
                    <input type="password" id="password" placeholder='xxxxxxxxxxxxxx' className="w-[358px] py-2 px-4 border border-[#C2C7D0] rounded bg-white" />
                </div>
                <div className="mt-2 text-left ml-[3rem]">
                    <a href="#" className="text-orange-500 ">نسيت كلمة المرور؟</a>
                </div>
                <div className="mt-6">
                    <button className="bg-orange-500 text-white py-2 px-6 rounded border border-orange-500 hover:bg-orange-400
                     hover:text-orange-500 transition duration-300">تسجيل الدخول</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
