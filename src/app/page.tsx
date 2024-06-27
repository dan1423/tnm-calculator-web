"use client";
import StagingCalculator from '@/components/StagingCalculator';
import { StagingCalculatorV2 } from '@/components/StagingCalculatorV2';




export default function Home() {
  return (
    <main className="flex-col items-center   p-10" style={{ backgroundColor: '#fff', color: '#000000' }}>
      {/* <StagingCalculator /> */}
      <StagingCalculatorV2 />
    </main>
  )
}
