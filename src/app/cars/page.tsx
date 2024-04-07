import React from 'react'
import { Suspense } from "react";
import LoadingComponent from "../loading";
import CardComponent from "@/components/cards/CardComponent";
import { ProductType } from "@/types/products";
import Link from "next/link";
import { Metadata } from "next";

async function fetchData() {
  const data = await fetch("https://store.istad.co/api/products/?page=1&pageSize=1000 ", {
    cache: "no-store",
  });
  const res = await data.json();
  return res.results;
}
export const metadata: Metadata = {
  title: "Our Cars",
  description: "Explore a wide range of cars available at BLOCKCHAIN.",
  keywords: ["cars", "vehicles", "automobiles"],
  openGraph: {
    title: "Our Cars",
    description: "Explore a wide range of cars available at BLOCKCHAIN",
  
  },
};
export default async function page() {
  const products = await fetchData();
  return (
    <>
    <h1 className="text-center text-2xl">Our Cars</h1>
    <div className="mt-10 flex justify-center flex-wrap gap-5 mb-10">
        <Suspense fallback={<LoadingComponent />}>
          <div className="container grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-8 mx-auto justify-center w-[90%]">
            {products.map((product: ProductType) => {
              return (
                <Link href={`/cars/${product.id}`} key={product.id}>
                  <CardComponent
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    desc={product.desc}
                  />
                </Link>
              );
            })}
          </div>
        </Suspense>
      </div>
    </>
  )
}
