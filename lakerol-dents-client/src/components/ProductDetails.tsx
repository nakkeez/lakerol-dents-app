import React from "react";
import Image from "next/image";

/**
 * Component for displaying product details
 *
 * @param product - Product object to display
 * @returns Product details component
 */
export default function ProductDetails({
  product,
}: {
  product: Product;
}): React.JSX.Element {
  return (
    <section className="flex flex-col bg-white rounded-lg items-center shadow-xl p-4 md:p-8 justify-between md:flex-row max-w-4xl dark:bg-black">
      <Image
        src={product.image}
        alt="Image of the product"
        width={220}
        height={120}
      />

      <div className="flex flex-col justify-between gap-4 p-4 md:p-6">
        <h5 className="text-2xl font-bold text-gray-800 dark:text-white">
          {product.name}
        </h5>
        <p className="text-gray-700 dark:text-gray-300">
          {product.description}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          EAN Code: {product.eanCode}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Package Size: {product.packageSize} g
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Energy: {product.energyKj}kJ/{product.energyKcal}kcal
        </p>
      </div>
    </section>
  );
}
