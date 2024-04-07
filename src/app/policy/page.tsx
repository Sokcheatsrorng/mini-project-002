import React from 'react';
import { Metadata } from 'next';
import { Button, Card } from "flowbite-react";
import { policyScript } from '@/types/policy';

// Define metadata
export const metadata: Metadata = {
  title: "Policy",
  description: "Discover the policy, terms, and conditions of BLOCKCHAIN, including information on privacy, data handling, and user agreements.",
  keywords: ["policy", "terms", "conditions", "BLOCKCHAIN"],
  openGraph: {
    title: "Policy",
    description: "Discover the policy, terms, and conditions of BLOCKCHAIN, including information on privacy, data handling, and user agreements.",
  },
};


export default function PolicyPage() {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8 mx-auto justify-center w-[70%] mb-10 mt-10">
      {
        policyScript.map((item, index) => (
          <Card key={index} className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.desc}
            </p>
            <Button>
              Read more
              <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
        ))
      }
    </div>
  );
}
