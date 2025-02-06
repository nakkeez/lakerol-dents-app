"use client";

import ProductDetails from "@/components/ProductDetails";
import { fetchData } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

/**
 * Page for searching products by EAN code and displaying product details.
 * @returns Home page component
 */
export default function HomePage(): React.JSX.Element {
  const searchParams = useSearchParams();
  const [eanCode, setEanCode] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    // Set EAN code from URL search params to the input field if available
    const param = searchParams.get("eanCode");
    if (param) {
      setEanCode(param);
    }
  }, [searchParams]);

  /**
   * Handle the form submission.
   *
   * @param e The form event
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetchProduct();
  }

  async function fetchProduct() {
    setProduct(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${eanCode}`;
    const token = session?.accessToken;

    await fetchData<Product>({
      url: url,
      setData: setProduct,
      onNotFoundMessage: `Product not found with EAN code ${eanCode}`,
      accessToken: token,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-extrabold">Search by EAN code</h1>
        <label htmlFor="eancode" className="block py-1">
          EAN Code
        </label>
        <input
          required
          value={eanCode}
          onChange={(e) => setEanCode(e.target.value)}
          name="eancode"
          pattern="\d{13}"
          title="Must be exactly 13 digits"
          minLength={13}
          maxLength={13}
          className="rounded p-2 ring-2 ring-inset bg-slate-200 dark:bg-gray-700 mr-2"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white mt-4 rounded"
        >
          Search
        </button>
      </form>
      {product && <ProductDetails product={product} />}{" "}
    </>
  );
}
