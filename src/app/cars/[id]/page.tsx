import React from 'react';
import { BASE_API_URL } from '@/constant/BASE_URL';
import Image from 'next/image';
import Link from 'next/link';
export type ParamProps = {
  params: {
    id: number
  }
}

// Fetch product detail data
async function getDetail(id: number) {
  const data = await fetch(`${BASE_API_URL}products/${id}/`);
  return data.json();
}

// DetailPage component
async function DetailPage({ params }: ParamProps) {
  const id = params.id;
  const productDetail = await getDetail(id);

  return (
    <main className='bg-whitesmoke'>
      <section className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 container mx-auto px-6 md:px-12 lg:px-24 py-12'>
        <div className='w-full md:w-auto'>
          <Image
            width={500}
            height={500}
            className='rounded-md shadow-md'
            src={productDetail.image}
            alt={productDetail.name}
          />
        </div>
        <div className='flex flex-col justify-center'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4'>{productDetail.name}</h1>
          <p className='text-base md:text-lg lg:text-xl mb-6'>{productDetail.desc}</p>
          <div className='flex items-center mb-6'>
            <p className='text-xl md:text-2xl lg:text-3xl font-semibold text-red-600 dark:text-white mr-4'>
              ${productDetail.price}
            </p>
            <button className='px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-orange-500'>
             In Stock
            </button>
          </div>
        
        </div>
      </section>
    </main>
  );
}

// Export DetailPage component
export default DetailPage;
