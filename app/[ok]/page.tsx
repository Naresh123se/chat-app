'use client'

import { Sliders } from "lucide-react";

interface User {

  params: {
    ok: string;
  };
};

export default function User11({ params: { ok: userId } }: User) {
  console.log("userId:", userId);
  console.log(userId)
  return (
    <>
      <p>{userId}</p>
      <div>
        <Sliders />
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
          <h2 className="text-2xl">Featured Products</h2>
          <ProductList />
        </div>

        <div className="mt-24  ">
          <h2 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">Categories</h2>
          <CategoryList />
        </div>

        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
          <h2 className="text-2xl">New Products</h2>
          <ProductList />
        </div>
      </div>
    </>
  );
}

