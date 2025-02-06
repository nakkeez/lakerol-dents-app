"use client";

import ProductCard from "@/components/ProductCard";
import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/fetchData";

/**
 * Page for filtering and displaying product cards.
 *
 * @returns Filter page component
 */
export default function FilterPage(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [packageSize, setPackageSize] = useState<number | undefined>(undefined);
  const [energyKcal, setEnergyKcal] = useState<number>(300);

  const { data: session } = useSession();

  /**
   * Handle the form submission.
   *
   * @param e The form event
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetchProducts();
  }

  /**
   * Fetch products from the server based on the filter parameters.
   */
  async function fetchProducts() {
    setProducts([]);
    const accessToken = session?.accessToken;

    const params = new URLSearchParams({
      nameContains: productName,
      maxEnergyKcal: energyKcal.toString(),
    });
    if (packageSize) {
      params.append("packageSize", packageSize.toString());
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api?${params}`;

    await fetchData<Product[]>({
      url,
      setData: setProducts,
      onNotFoundMessage: "Products not found with specified parameters",
      accessToken,
    });
  }

  const productItems = products.map((item: Product, index: number) => (
    <ProductCard key={index} product={item} />
  ));

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
        <h1 className="text-4xl font-extrabold">Filter Products</h1>
        <div>
          <label htmlFor="name" className="block py-1">
            Product Name:
          </label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            name="name"
            className="rounded p-2 ring-2 ring-inset bg-slate-200 dark:bg-gray-700"
          />
        </div>

        <fieldset>
          <legend>Select Package Size:</legend>

          <div>
            <input
              type="radio"
              id="allSizes"
              name="drone"
              value={undefined}
              onChange={(e) => setPackageSize(Number(e.target.value))}
              className="cursor-pointer"
              defaultChecked
            />
            <label htmlFor="allSizes">All</label>
          </div>

          <div>
            <input
              type="radio"
              id="thirtysix"
              name="drone"
              value="36"
              onChange={(e) => setPackageSize(Number(e.target.value))}
              className="cursor-pointer"
            />
            <label htmlFor="thirtysix">36g</label>
          </div>

          <div>
            <input
              type="radio"
              id="eightyfive"
              name="drone"
              value="85"
              onChange={(e) => setPackageSize(Number(e.target.value))}
              className="cursor-pointer"
            />
            <label htmlFor="eightyfive">85g</label>
          </div>
        </fieldset>

        <div>
          <label htmlFor="kcal-range" className="block mb-2">
            Energy Max Amount:
          </label>
          <input
            id="kcal-range"
            type="range"
            value={energyKcal}
            min="250"
            max="300"
            onChange={(e) => setEnergyKcal(Number(e.target.value))}
            className="w-full h-2 rounded-lg cursor-pointer"
          />
          <p>{energyKcal} kcal</p>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white mt-4 rounded"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productItems}
      </div>
    </>
  );
}
