"use client";
import StagingCalculator from '@/components/StagingCalculator';



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center   p-10" style={{ backgroundColor: '#fff', color: '#000000' }}>
      <h1 style={{ fontSize: 30 }}>AJCC TNM Staging Calculator</h1>
      <div  className='container mb-5'>
      <label  className='block mb-2 text-base font-medium text-gray-900 dark:text-white content-start'>Select a Staging Type:</label>
                <select className='block w-6/12 px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg
                 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                  <option value="clinical">Clinical</option>
                  {/* <option value="none">None</option> */}
                </select>
      </div>






      <StagingCalculator />
    </main>
  )
}
