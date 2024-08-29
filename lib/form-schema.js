import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const categorySchema = z.object({
  name: z.string().refine((val) => val.length != 0, "Name is required"),
  slug: z.string().refine((val) => val.length != 0, "Slug is required"),
  priority: z.any().refine((val) => val.length != 0, "Priority is required"),
  logo: z.any().refine((val) => val.length != 0, "Logo is required"),
});

export const subCategorySchema = z.object({
  name: z.string().refine((val) => val.length != 0, "Name is required"),
  priority: z.any().refine((val) => val.length != 0, "Priority is required"),
  category_id: z
    .any()
    .refine((val) => val.length != 0, "Category ID is required"),
  logo: z.any().refine((val) => val.length != 0, "Logo is required"),
});

export const subSubCategorySchema = z.object({
  name: z.string().refine((val) => val.length != 0, "Name is required"),
  priority: z.any().refine((val) => val.length != 0, "Priority is required"),
  sub_category_id: z
    .any()
    .refine((val) => val.length != 0, "Sub Category ID is required"),
});

export const bannerSchema = z.object({
  type: z.string().refine((val) => val.length != 0, "Type is required"),
  priority: z.string().refine((val) => val.length != 0, "Priority is required"),
  name: z.string().refine((val) => val.length != 0, "Banner Name is required"),
  file: z.any().refine((val) => val.length != 0, "Banner File is required"),
});

export const addBrandsSchema = z.object({
  name: z.string().refine((val) => val.length != 0, "Brand name is required"),
  logo: z.any().refine((val) => val.length != 0, "Brand logo is required"),
  slug: z.string().refine((val) => val.length != 0, "Slug is required"),
  priority: z.string().refine((val) => val.length != 0, "Priority is required"),
  status: z.string().refine((val) => val.length != 0, "Status is required"),
});

export const frontendSchema = z.object({
  header_param: z
    .string()
    .refine((val) => val.length != 0, "Header Paragraph is required"),
  header_photo: z
    .any()
    .refine((val) => val.length != 0, "Brand logo is required"),
  no_1: z.any().refine((val) => val.length != 0, "Image is required"),
  no_2: z.any().refine((val) => val.length != 0, "Image is required"),
  no_3: z.any().refine((val) => val.length != 0, "Image is required"),
  no_4: z.any().refine((val) => val.length != 0, "Image is required"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const updateUserLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().refine((val) => val.length != 0, "Name is required"),
  phone: z.string().refine((val) => {
    const phoneNumber = String(val);
    return (
      phoneNumber.length === 10 &&
      /^\d+$/.test(phoneNumber) &&
      /^[6-9]/.test(phoneNumber)
    );
  }, "Phone must be a 10-digit Indian number"),
});

export const userSignSchema = z.object({
  name: z.string().refine((val) => val.length != 0, "Name is required"),
  address: z.string().refine((val) => val.length != 0, "Address is required"),
  email: z.string().email("Invalid email address"),
  // phone: z.string().refine((val) => val.length != 0, "Phone is required"),
  phone: z.string().refine((val) => {
    const phoneNumber = String(val);
    return (
      phoneNumber.length === 10 &&
      /^\d+$/.test(phoneNumber) &&
      /^[6-9]/.test(phoneNumber)
    );
  }, "Phone must be a 10-digit Indian number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const addNewProductSchema = z.object({
  name: z.string().refine((val) => val.length != 0, "Name is required"),
  slug: z.string().refine((val) => val.length != 0, "Slug is required"),
  description: z
    .string()
    .refine((val) => val.length != 0, "Description is required"),
  type: z.string().refine((val) => val.length != 0, "Type is required"),
  sku: z.string().refine((val) => val.length != 0, "SKU is required"),
  search_tags: z
    .string()
    .refine((val) => val.length != 0, "Search Tags is required"),
  unit: z.any().refine((val) => val.length != 0, "Priority is required"),
  unit_price: z
    .string()
    .refine((val) => val.length != 0, "Unit Price is required"),
  higher_price: z
    .string()
    .refine((val) => val.length != 0, "Higher Price is required"),
  minimum_order_qty: z
    .string()
    .refine((val) => val.length != 0, "Minimum Order Qty is required"),
  current_stock_qty: z
    .string()
    .refine((val) => val.length != 0, "Current Stock Qty is required"),
  discount_type: z
    .any()
    .refine((val) => val.length != 0, "Priority is required"),
  discount_amount: z
    .string()
    .refine((val) => val.length != 0, "Discount Amount is required"),
  tax_amount: z
    .string()
    .refine((val) => val.length != 0, "Tax Amount is required"),
  tax_calculation: z
    .string()
    .refine((val) => val.length != 0, "Tax Calculation is required"),
  attribute_value: z
    .any()
    .refine((val) => val.length != 0, "Attribute Value is required"),
  shipping_cost: z
    .string()
    .refine((val) => val.length != 0, "Shipping Cost is required"),
  youtube_video_link: z.string().optional(),
  meta_title: z
    .string()
    .refine((val) => val.length != 0, "Meta Title is required"),
  meta_description: z
    .string()
    .refine((val) => val.length != 0, "Meta Description is required"),
  color: z.any().refine((val) => val.length != 0, "color is required"),
  attribute: z.any().refine((val) => val.length != 0, "Attribute is required"),
  product_thumbnail: z
    .any()
    .refine((val) => val.length != 0, "Product Thumbnail is required"),
  additional_image_1: z
    .any()
    .refine((val) => val.length != 0, "Additional Image is required"),
  additional_image_2: z
    .any()
    .refine((val) => val.length != 0, "Additional Image is required"),
  additional_image_3: z
    .any()
    .refine((val) => val.length != 0, "Additional Image is required"),
  category_id: z
    .any()
    .refine((val) => val && val.length != 0, "Category ID is required"),
  sub_category_id: z
    .any()
    .refine((val) => val && val.length != 0, "Sub Category ID is required"),
  sub_sub_category_id: z
    .any()
    .refine((val) => val && val.length != 0, "Sub SubCategory ID is required"),
  brand_id: z
    .any()
    .refine((val) => val && val.length != 0, "Brand ID is required"),
  id: z.any().optional(),
});
