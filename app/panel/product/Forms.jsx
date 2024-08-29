import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/imdos-ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye } from "lucide-react";
import { PATH_URL } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImdosUI } from "@/providers/ImdosProvider";
import { addNewProductSchema } from "@/lib/form-schema";
import { useController, useForm } from "react-hook-form";
import { Card, CardDescription } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { LoadingButton } from "@/components/imdos-components/LoadingButton";

const Forms = ({ onSubmit }) => {
  const { loading, setLoading } = useImdosUI();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [slug, setSlug] = useState("");

  // const [productattribute, setProductattribute] = useState(null);

  const form = useForm({
    resolver: zodResolver(addNewProductSchema),
    defaultValues: {
      name: "",
      higher_price: "",
      description: "",
      type: "",
      sku: "",
      search_tags: "",
      unit: "",
      unit_price: "",
      minimum_order_qty: "0",
      current_stock_qty: "0",
      discount_type: "",
      discount_amount: "0",
      tax_amount: "0",
      tax_calculation: "0",
      attribute_value: "",
      shipping_cost: "0",
      youtube_video_link: "",
      meta_title: "",
      meta_description: "",
      color: "",
      attribute: "",
      product_thumbnail: "",
      additional_image_1: "",
      additional_image_2: "",
      additional_image_3: "",
      id: searchParams.get("product_id") ?? null,
      category_id: searchParams.get("category_id"),
      sub_category_id: searchParams.get("sub_category_id"),
      sub_sub_category_id: searchParams.get("sub_sub_category_id"),
      brand_id: searchParams.get("brand_id"),
    },
  });

  const getProduct = async () => {
    const formData = new FormData();

    formData.append("select", JSON.stringify(["*"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "id",
          type: "=",
          value: searchParams.get("product_id"),
        },
      ])
    );

    // async function gatAttribute() {
    //   try {
    //     const formData = new FormData();

    //     formData.append(
    //       "select",
    //       JSON.stringify(["id as value", "name as label"])
    //     );

    //     const request = await fetch("/api/imdos/product-attribute/read", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     const response = await request.json();
    //     console.log(response.data);
    //     setProductattribute(response.data);
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // }
    // console.log(productattribute, "sss");
    // useEffect(() => {
    //   gatAttribute();
    // }, []);

    const request = await fetch("/api/imdos/products/read", {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    form.reset({
      name: response.data[0]?.name,
      higher_price: response.data[0]?.higher_price,
      slug: response.data[0]?.slug,
      description: response.data[0]?.description,
      type: response.data[0]?.type,
      sku: response.data[0]?.sku,
      search_tags: response.data[0]?.search_tags,
      unit: response.data[0]?.unit,
      unit_price: response.data[0]?.unit_price,
      minimum_order_qty: response.data[0]?.minimum_order_qty,
      current_stock_qty: response.data[0]?.current_stock_qty,
      discount_type: response.data[0]?.discount_type,
      discount_amount: response.data[0]?.discount_amount,
      tax_amount: response.data[0]?.tax_amount,
      tax_calculation: response.data[0]?.tax_calculation,
      shipping_cost: response.data[0]?.shipping_cost,
      youtube_video_link: response.data[0]?.youtube_video_link,
      meta_title: response.data[0]?.meta_title,
      meta_description: response.data[0]?.meta_description,
      color: response.data[0]?.color,
      attribute: response.data[0]?.attribute,
      attribute_value: response.data[0]?.attribute_value,
      product_thumbnail: response.data[0]?.product_thumbnail,
      additional_image_1: response.data[0]?.additional_image_1,
      additional_image_2: response.data[0]?.additional_image_2,
      additional_image_3: response.data[0]?.additional_image_3,
      id: searchParams.get("product_id") ?? null,
      category_id: searchParams.get("category_id"),
      sub_category_id: searchParams.get("sub_category_id"),
      sub_sub_category_id: searchParams.get("sub_sub_category_id"),
      brand_id: searchParams.get("brand_id"),
    });
  };

  useEffect(() => {
    if (searchParams.get("product_id")) {
      getProduct();
    }
  }, [searchParams]);

  const createSlug = (value) => {
    let slug = value.toLowerCase();
    slug = slug.replace(/[^\w\s-]/g, "");
    slug = slug.replace(/\s+/g, "-");
    slug = slug.trim();
    form.setValue("slug", slug, { shouldValidate: true });
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const response = await onSubmit(values);
    if (!searchParams.get("product_id") && response == 200) {
      router.back();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-2"
        >
          <Card className="bg-background dark:border full-card p-5">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      placeholder={"Product Name"}
                      defaultValue={field.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        createSlug(value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"slug"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Slug</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      placeholder={"Product Slug"}
                      defaultValue={field.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full p-3 rounded-lg"
                      type={"text"}
                      placeholder={"Description"}
                      defaultValue={field.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
          <Card className="bg-background dark:border full-card p-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between mb-3">
              <div className="text">
                <h1 className="text-lg font-semibold">General Setup</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <FormField
                control={form.control}
                name={"type"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Product Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="physical">Physical</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="digital">Digital</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"sku"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product SKU</FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder={"Ex: 68242"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"unit"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kg">KG</SelectItem>
                        <SelectItem value="pc">PC</SelectItem>
                        <SelectItem value="gms">GMS</SelectItem>
                        <SelectItem value="pair">PAIR</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"search_tags"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Tags</FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder={"Enter Tags"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card className="bg-background dark:border full-card p-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between mb-3">
              <div className="text">
                <h1 className="text-lg font-semibold">Pricing & others</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <FormField
                control={form.control}
                name={"unit_price"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder={"Unit Price"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"higher_price"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Higher Price</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder={"Higher Price"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          createSlug(value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"minimum_order_qty"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Qty</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder={"1"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"current_stock_qty"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Stock Qty</FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"discount_type"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="percent">Percent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"discount_amount"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Amount</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"tax_amount"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Amount</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"tax_calculation"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Calculation</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder={"Tax Calculation"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"shipping_cost"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Cost</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder={"Shipping Cost"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card className="bg-background dark:border full-card p-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between mb-3">
              <div className="text">
                <h1 className="text-lg font-semibold">
                  Product Variation Setup
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <FormField
                control={form.control}
                name={"color"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Colors</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="na">N/A</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"attribute"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Attribute</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // items: productattribute ?? [];
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="type">Type</SelectItem>
                        <SelectItem value="size">Size</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"attribute_value"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attribute Value</FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder={"Attribute Value"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="bg-background dark:border full-card p-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between mb-3">
              <div className="text">
                <h1 className="text-lg font-semibold">Thumbnail Section</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <FormField
                control={form.control}
                name={"product_thumbnail"}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <div className="s">
                        <FormLabel>Product Thumbnail</FormLabel>
                        <CardDescription className="text-[12px]">
                          Ratio 1:1 (500 x 500 px)
                        </CardDescription>
                      </div>
                      <Eye
                        className="mr-2"
                        size={20}
                        onClick={() => {
                          router.push(PATH_URL + field.value);
                        }}
                      />
                    </div>
                    <FormControl>
                      <Input
                        type={"file"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"additional_image_1"}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <div>
                        <FormLabel>Upload Additional Image 1</FormLabel>
                        <CardDescription className="text-[12px]">
                          Ratio 1:1 (500 x 500 px)
                        </CardDescription>
                      </div>
                      <Eye
                        className="mr-2"
                        size={20}
                        onClick={() => {
                          router.push(PATH_URL + field.value);
                        }}
                      />
                    </div>
                    <FormControl>
                      <Input
                        type={"file"}
                        placeholder={"1"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"additional_image_2"}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <div>
                        <FormLabel>Upload Additional Image 2</FormLabel>
                        <CardDescription className="text-[12px]">
                          Ratio 1:1 (500 x 500 px)
                        </CardDescription>
                      </div>
                      <Eye
                        className="mr-2"
                        size={20}
                        onClick={() => {
                          router.push(PATH_URL + field.value);
                        }}
                      />
                    </div>

                    <FormControl>
                      <Input
                        type={"file"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"additional_image_3"}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <div>
                        <FormLabel>Upload Additional Image 3</FormLabel>
                        <CardDescription className="text-[12px]">
                          Ratio 1:1 (500 x 500 px)
                        </CardDescription>
                      </div>
                      <Eye
                        className="mr-2"
                        size={20}
                        onClick={() => {
                          router.push(PATH_URL + field.value);
                        }}
                      />
                    </div>

                    <FormControl>
                      <Input
                        type={"file"}
                        defaultValue={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card className="bg-background dark:border full-card p-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between mb-3">
              <div className="text">
                <h1 className="text-lg font-semibold">Product video</h1>
              </div>
            </div>
            <FormField
              control={form.control}
              name={"youtube_video_link"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube Video Link</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      placeholder={"Ex: https://www.youtube.com"}
                      defaultValue={field.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
          <Card className="bg-background dark:border full-card p-5">
            <FormField
              control={form.control}
              name={"meta_title"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      placeholder={"Meta Title"}
                      defaultValue={field.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"meta_description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full p-3 rounded-lg"
                      type={"text"}
                      placeholder={"Description"}
                      defaultValue={field.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
          <div className="flex justify-end">
            <LoadingButton className="px-4 py-2" type="submit">
              Submit
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Forms;
