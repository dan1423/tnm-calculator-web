"use client";
import StagingCalculator from '@/components/StagingCalculator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-10" style={{backgroundColor:'#fff'}}>
      <h1 style={{fontSize:30}}>AJCC TNM Calculator</h1>
     <StagingCalculator/>
    </main>
  )
}
