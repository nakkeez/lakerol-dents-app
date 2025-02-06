import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

/**
 * Component for displaying product card.
 *
 * @param product - Product object to display
 * @returns Product card component
 */
export default function ProductCard({
  product,
}: {
  product: Product;
}): React.JSX.Element {
  return (
    <article
      onClick={() => {
        // Redirect user to product details page with the EAN code as query parameter
        redirect(`/?eanCode=${product.eanCode}`);
      }}
      className="flex p-1 flex-col bg-white border-2 rounded-lg shadow-lg cursor-pointer lg:flex-row lg:max-w-xl hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div className="bg-slate-300 w-full flex justify-center lg:w-[170] lg:justify-start lg:bg-transparent">
        <Image
          src={product.image}
          alt="Image of the product"
          width={150}
          height={150}
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col w-full justify-between p-4">
        <h5 className="mb-2 text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          EAN Code: {product.eanCode}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          Package Size: {product.packageSize} g
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          Energy: {product.energyKj}kJ/{product.energyKcal}kcal
        </p>
      </div>
    </article>
  );
}
