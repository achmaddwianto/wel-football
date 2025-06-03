"use client";

import { createProduct, updateProduct } from "@/lib/actions";
import { ProductSchema } from "@/lib/zod";
// import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";

interface FormProductProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  onSuccess?: () => void;
}

// Define proper types for form data
interface FormData {
  name: string;
  price: string;
  stock: string;
  description: string;
  category: string;
  image?: File;
}

export function FormProduct({
  open,
  onOpenChange,
  product,
  onSuccess,
}: FormProductProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "jersey",
    image: undefined as File | undefined,
  });

  //Update form dataa ketika perubahan produk
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        category: product.category || "jersey",
        image: undefined,
      });
      if (product.imageUrl) {
        setImagePreview(product.imageUrl);
      } else {
        setImagePreview(null);
      }
    } else {
      //Reset form ketika tambah produk baru
      setFormData({
        name: "",
        price: "0",
        stock: "0",
        description: "",
        category: "jersey",
        image: undefined,
      });
      setImagePreview(null);
    }
    setFormErrors({});
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    //Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Ukuran gambar terlalu besar. Maksimal 2MB.",
        }));
        return;
      }
      // check file type
      if (!file.type.startsWith("image/")) {
        setFormErrors((prev) => ({
          ...prev,
          image: "File harus berupa gambar (JPEG, PNG, etc).",
        }));
        return;
      }

      // Create a safe object URL instead of using FileReader and Base64
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setFormData((prev) => ({ ...prev, image: file }));

      // Clear any preious image errors
      if (formErrors.image) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    }
  };

  const removeImage = () => {
    if (
      imagePreview &&
      typeof imagePreview === "string" &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: undefined }));
  };

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        typeof imagePreview === "string" &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const validateForm = () => {
    try {
      const dataToValidate = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
      };

      ProductSchema.parse(dataToValidate);
      setFormErrors({});
      return true;
    } catch (error: any) {
      if (error.errors) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            errors[err.path[0]] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
      };

      // In a real app, this would upload the image and save the product
      let result;
      if (product) {
        // await updateProduct(product.id, formData)
        result = await updateProduct(product.id, dataToSubmit);
      } else {
        // await createProduct(formData)
        result = await createProduct(dataToSubmit);
      }

      if (result.success) {
        onSuccess?.();
      } else {
        console.error("Failed to save product:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-9999999">
      <div className="bg-white rounded-md shadow-xl max-w-2xl w-full mx-4 min-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="mb-5">
            <h3 className="text-lg font-medium text-gray-900">
              {product ? "Edit Produk" : "Tambah Produk Baru"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product
                ? "Perbarui detail produk anda disini"
                : "Isi detail untuk menambahkan produk baru ke inventory Anda."}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${
                    formErrors.name ? "border-red-300" : "border-gray-300"
                  } shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                  placeholder="Barcelona Home Jersey 2023/2024"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${
                    formErrors.category ? "border-red-300" : "border-gray-300"
                  } shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  <option value="jersey">Jersey</option>
                  <option value="shoes">Sepatu</option>
                </select>
                {formErrors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.category}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga (IDR)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${
                    formErrors.price ? "border-red-300" : "border-gray-300"
                  } shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                  placeholder="899000"
                />
                {formErrors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.price}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stok
                </label>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.stock ? "border-red-300" : "border-gray-300"
                  } shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                  placeholder="50"
                />
                {formErrors.stock && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.stock}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Foto Produk
              </label>
              <div className="mt-1 flex flex-col items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={removeImage}
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
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-gray-400 mb-2"
                    >
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                      <path d="m9 15 3-3 3 3"></path>
                      <path d="M14 5v6h6"></path>
                    </svg>
                    <p className="text-sm text-gray-500">
                      Drag and drop or click to upload
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="product-image"
                      onChange={handleImageChange}
                    />
                    <button
                      type="button"
                      className="mt-2 px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() =>
                        document.getElementById("product-image")?.click()
                      }
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Upload foto produk berkualitas tinggi. Ukuran maksimal: 2MB.
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`mt-1 block w-full rounded-md border ${
                  formErrors.description ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                placeholder="Deskripsi detail produk..."
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div className="bg-white -mx-6 -mb-6 px-6 py-3 flex justify-end gap-2 rounded-b-lg">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => onOpenChange(false)}
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Menyimpan..."
                  : product
                  ? "Perbarui Produk"
                  : "Tambah Produk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
