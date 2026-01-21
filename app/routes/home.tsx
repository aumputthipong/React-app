import type { Route } from "./+types/home";
import {Canvas} from '@react-three/fiber';
import {Box, OrbitControls} from '@react-three/drei';
// import Earth from '../components/canvas/Earth';
// ฟังก์ชันดึงข้อมูล (รันที่ Server หรือตอนเปลี่ยน Route)

export async function loader({ params }: Route.LoaderArgs) {
  const data = await fetch("https://696b8b2a624d7ddccaa17d28.mockapi.io/User").then(res => res.json());
  return { items: data };
}
import { Link } from "react-router";
import { Suspense } from "react";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#0A1128]">
      {/* 1. Navigation Bar - ดีไซน์แบบลอยตัวตามรูป */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl bg-white/80 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-12">
          <div className="text-2xl font-bold tracking-tight">Warming</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link to="/about" className="hover:text-black transition-colors">About</Link>
            <Link to="/products" className="hover:text-black transition-colors">Products</Link>
            {/* <Link to="/pricing" className="hover:text-black transition-colors">Pricing</Link> */}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 text-sm font-medium hover:bg-gray-100 rounded-full transition-colors">
            Login
          </button>
          <button className="px-6 py-2 text-sm font-medium bg-[#0A1128] text-white rounded-full hover:bg-opacity-90 transition-all">
            Get Start 
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <main className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-20 px-[5%] max-w-7xl mx-auto items-center">
        
        {/* ฝั่งซ้าย: Content */}
        <div className="z-10 max-w-xl">
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] mb-8">
            Warm <br />
            my skill <br />
            <span className="text-[#0A1128]">power up!</span>
          </h1>
          
          <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-md">
           this is my warm up project to study react with frontend skills  typescript and tailwindcss.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Enter something here ..."
              className="px-8 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-80 transition-all"
            />
            <button className="px-8 py-4 bg-[#0A1128] text-white font-semibold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-900/10">
              Button me
            </button>
          </div>
        </div>

        {/* ฝั่งขวา: พื้นที่สำหรับ 3D Model (Placeholder) */}
        <div className="relative h-[500px] lg:h-full flex items-center justify-center">
          {/* เว้นว่างไว้สำหรับ 3D ของคุณ หรือใส่ Placeholder เท่ๆ ไว้ก่อน */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-purple-50/30 rounded-[3rem] blur-3xl -z-10" />
          
          <div className="w-full h-[80%] border-2 border-dashed border-gray-200 rounded-[2rem] flex items-center justify-center text-gray-400 italic">
            {/* คุณสามารถนำ Canvas จาก Three.js หรือ Spline มาใส่ตรงนี้ได้เลย */}
         <Canvas>
  <Box />
</Canvas>
          </div>
        </div>

      </main>
    </div>
  );
}