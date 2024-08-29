"use client";
import React from "react";
import { addNewProductSchema } from "@/lib/form-schema";
import toast from "react-hot-toast";
import Forms from "../Forms";

const prefix = {
  title: "Add New Products",
  description: "Select the item to manage the content",
  singular: "Add New Product",
  uid: "products",
  endpoint: "/api/imdos/products/read",
  schema: addNewProductSchema,
};

const NewProduct = () => {
  const onSubmit = async (value) => {
    try {
      const formData = new FormData();
      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, val);
      });

      function generateValidationRule(key) {
        if (key === "slug") {
          return value?.id ? "required" : "required|unique";
        } else if (key === "youtube_video_link") {
          return "optional";
        } else {
          return "required";
        }
      }

      const validation = {};
      Object.keys(value).forEach((key) => {
        validation[key] = generateValidationRule(key);
      });

      formData.append("fileUpload", true);
      formData.append("fileDestination", "Products");
      formData.append("fileValidation", ["jpg", "jpeg", "png"]);

      formData.append("validation", JSON.stringify([validation]));

      if (value?.id) formData.append("refId", value?.id);

      const endpoint = value?.id
        ? `/api/imdos/${prefix.uid}/update`
        : `/api/imdos/${prefix.uid}/create`;
      const request = await fetch(endpoint, { method: "POST", body: formData });

      const response = await request.json();

      if (!request.ok) {
        throw new Error(response.error);
        return 400;
      }
      toast.success(response.message);
      return 200;
    } catch (error) {
      toast.error(error.message);
      return 400;
    }
  };

  return (
    <div>
      <Forms onSubmit={onSubmit} />
    </div>
  );
};

export default NewProduct;
