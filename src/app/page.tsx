import { Suspense } from "react";
import LoadingComponent from "./loading";
import CardComponent from "@/components/cards/CardComponent";
import { ProductType } from "@/types/products";
import Link from "next/link";
import { Metadata } from "next";
import HeroSectionComponent from "@/components/herosection/HeroSectionComponent";
import DisplayDetailinHomePage from "@/components/cards/DisplayDetailinHomePage";
import { BASE_API_URL } from "@/constant/BASE_URL";

async function fetchProducts(sellerName:string){
  const products = await fetch(`${BASE_API_URL}products?page=1&page_size=1000`,{
    cache: "no-store"
  });
  const rest = await products.json();
  const filteredProducts = rest.results.filter((product: ProductType) => product.seller === sellerName);
  return filteredProducts;

}
export const metadata: Metadata = {
  title: "BLOCKCHAIN",
  description: "Welcome to BLOCKCHAIN Page.",
  keywords: ["cars", "ecommerce", "sell"],
};
export default async function Home() {
  const sellerName ="Sokcheat Srorng"
  const products = await fetchProducts(sellerName);
  return (
    <>
    <HeroSectionComponent/>
    <h1 className="text-center mt-10 text-2xl">OUR PRODUCTS</h1>
      <div className="mt-10 flex justify-center flex-wrap gap-5">
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

    <DisplayDetailinHomePage/>
    </>
  );
}
