import { ProductType } from "@/types/products";
import { describe } from "node:test";
import { title } from "process";
import React from "react";
export type ParamProps = {
  params: {
    id: number;
  };
};

async function getDetail(id: number) {
  const productDetail = await fetch(`https://store.istad.co/api/products/${id}`);
  const res = productDetail.json();
  return res;
}

// export async function generateMetadata(params: any) {
//   const id = params.id
//   const product = await getDetail(id);
//   return {
//     title: product?.title,
//     describe: product.description,
//     openGraph: {
//       images: product.thumbnail,
//     },
//   }
// }

async function page({ params }:ParamProps) {
  const id = params.id;
  const productDetail = await getDetail(23);
  console.log(productDetail)
  return (
    <>
      
    </>
    // {
    //    productDetail.map((pro:ProductType)=>{

    //    })
    // }
   
  );
}

export default page;
