"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProduct } from "../FormProduct/FormProduct";
import { deleteProduct, getProducts } from "@/lib/actions";
import ProductTableSkeleton from "@/components/shared/skeletons/TableProductSkeletons";

interface Product {
  id: string;
  name: string;
  price: string | string;
  stock: number;
  category: string;
  imageUrl: string | null;
  description: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: string;
  isActive: boolean;
}

export default function TableProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Load Produk on komponen mount
  useEffect(() => {
    loadProducts();

    // Add event listener for the add procuk button
    const addButton = document.getElementById("add-product-button");
    if (addButton) {
      addButton.addEventListener("click", () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
      });
    }

    // Clean up event listener
    return () => {
      if (addButton) {
        addButton.removeEventListener("click", () => {
          setSelectedProduct(null);
          setIsFormOpen(true);
        });
      }
    };
  }, []);

  async function loadProducts() {
    try {
      setIsLoading(true);
      const result = await getProducts();
      if (result.success && result.products) {
        setProducts(result.products || []);
      } else {
        console.error("Failed to load products:", result.error);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteProduct(id);
      if (result.success) {
        loadProducts();
      } else {
        console.error("Failed to delete product:", result.error);
      }
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to deleting product:", error);
    }
  };

  const confirmDelete = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(numericPrice);
  };

  if (loading) {
    return <ProductTableSkeleton />;
  }

  return (
    <>
      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Gambar
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Harga
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stok
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kategori
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  Tidak ada produk ditemukan
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                      src={product.imageUrl || "placeholder.svg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 20
                          ? "bg-green-100 text-green-800"
                          : product.stock > 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} tersedia
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                          <path d="m15 5 4 4"></path>
                        </svg>
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => confirmDelete(product.id)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" x2="10" y1="11" y2="17"></line>
                          <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                        <span className="sr-only">Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <FormProduct
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={selectedProduct}
        onSuccess={() => {
          setIsFormOpen(false);
          setSelectedProduct(null);
        }}
      />

      {/* Dialog/Modal konfirmasi Hapus */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-99999">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Apakah kamu yakin?
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
                produk secara permanen.
              </p>
            </div>
            <div className="bg-white px-6 py-3 flex justify-end gap-2 rounded-b-lg">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Kembali
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => productToDelete && handleDelete(productToDelete)}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
