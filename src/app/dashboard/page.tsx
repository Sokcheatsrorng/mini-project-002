import React from 'react'
import ProductTable from '@/components/table/ProductTableComponent'
export default function page() {
  return (
    <div className="flex flex-col justify-center text-center w-full mx-7">
    <h1 className="font-bold text-[25px]">Products Data</h1>
    <ProductTable/>
  </div>
  )
}
