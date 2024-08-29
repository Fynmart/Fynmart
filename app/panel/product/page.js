"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { categorySchema } from "@/lib/form-schema";
import { useImdosUI } from "@/providers/ImdosProvider";
import DataTable from "@/components/imdos-components/DataTable";
import FormModal from "@/components/imdos-components/FormModal";
import FilterForm from "@/components/imdos-components/FilterForm";

const prefix = {
  title: "Products",
  singular: "Product",
  uid: "products",
  endpoint: "/api/imdos/products/read",
  schema: categorySchema,
};

const Managements = () => {
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subSubCategories, setSubSubCategories] = useState(null);

  const [tableData, setTableData] = useState(null);
  const [refValues, setRefValues] = useState(null);
  const { formModal, setFormModal, setConfirmAlert } = useImdosUI();
  const router = useRouter();

  const getData = async (table, conditions) => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["id as value", "name as label"]));
    formData.append("conditions", JSON.stringify(conditions));

    const request = await fetch(`/api/imdos/${table}/read`, {
      method: "POST",
      body: formData,
    });

    return await request.json();
  };

  const getBrands = async () => {
    const response = await getData("brands", null);
    setBrands(response.data);
  };

  const getCategories = async () => {
    const response = await getData("categories", null);
    setCategories(response.data);
  };

  const getSubCategories = async (category_id) => {
    const response = await getData("sub_categories", [
      {
        on: "category_id",
        type: "=",
        value: category_id,
      },
    ]);
    setSubCategories(response.data);
  };

  const getSubSubCategories = async (sub_category_id) => {
    const response = await getData("sub_sub_categories", [
      {
        on: "sub_category_id",
        type: "=",
        value: sub_category_id,
      },
    ]);
    setSubSubCategories(response.data);
  };

  useEffect(() => {
    getBrands();
    getCategories();
  }, []);

  const mutate = async (value) => {
    const formData = new FormData();

    formData.append("select", JSON.stringify(["*"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "brand_id",
          type: "=",
          value: value?.brand_id ?? refValues?.brand_id,
        },
        {
          on: "category_id",
          type: "=",
          value: value?.category_id ?? refValues?.category_id,
        },
        {
          on: "sub_category_id",
          type: "=",
          value: value?.sub_category_id ?? refValues?.sub_category_id,
        },
      ])
    );
    const request = await fetch(prefix.endpoint, {
      method: "POST",
      body: formData,
    });

    const response = await request.json();
    setTableData(response.data);
  };

  const handleFormSubmit = async (values) => {
    setRefValues(values);
    mutate(values);
  };

  const filterInputs = [
    {
      title: "Brands",
      type: "dropdown",
      uid: "brand_id",
      items: brands,
    },
    {
      title: "Category",
      type: "dropdown",
      uid: "category_id",
      items: categories,
      onChange: (value) => {
        getSubCategories(value);
      },
    },
    {
      title: "Sub Category",
      type: "dropdown",
      uid: "sub_category_id",
      items: subCategories,
      onChange: (value) => {
        getSubSubCategories(value);
      },
    },
    // {
    //   title: "Sub Sub Category",
    //   type: "dropdown",
    //   uid: "sub_sub_category_id",
    //   optional: true,
    //   items: subSubCategories,
    // },
  ];

  const columns = [
    {
      id: "serial",
      header: "#",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "unit_price",
      header: "Unit Price",
      cell: ({ row }) => (
        <div>
          {row.getValue("unit_price")}
          {/* {row.original.unit} */}
        </div>
      ),
    },
    {
      accessorKey: "higher_price",
      header: "Higher Price",
      cell: ({ row }) => <div>{row.getValue("higher_price")}</div>,
    },
    {
      accessorKey: "discount_amount",
      header: "Discount Amount",
      cell: ({ row }) => <div>{row.getValue("discount_amount")}</div>,
    },
    {
      accessorKey: "current_stock_qty",
      header: "Current Stock",
      cell: ({ row }) => (
        <div className="whitespace-normal capitalize">
          {row.getValue("current_stock_qty")}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => (
        <div className="whitespace-normal">{row.getValue("created_at")}</div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  router.push(
                    `/panel/product/add?product_id=${row.original.id}&category_id=${refValues.category_id}&sub_category_id=${refValues.sub_category_id}&sub_sub_category_id=${refValues.sub_sub_category_id}&brand_id=${refValues.brand_id}`
                  );
                }}
                className="gap-2"
              >
                <Edit size={18} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setConfirmAlert({
                    open: true,
                    refId: row.original.id,
                    data: row.original,
                    table: prefix.uid,
                    mutate: mutate,
                  });
                }}
                className="gap-2"
              >
                <Trash size={18} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-3">
      <Card className="bg-background dark:border full-card p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between mb-3">
          <div className="text">
            <h1 className="text-lg font-semibold">Filter {prefix.title}</h1>
            <p className="text-sm">Select the details you want get data from</p>
          </div>
        </div>
        <FilterForm
          filterInputs={filterInputs}
          setTableData={setTableData}
          handleFormSubmit={handleFormSubmit}
        />
      </Card>

      {tableData && (
        <Card className="bg-background dark:border full-card p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between mb-3">
            <div className="text">
              <h1 className="text-lg font-semibold">Manage {prefix.title}</h1>
              <p className="text-sm">
                Click on action to view or update information
              </p>
            </div>
            <Button
              color="primary"
              onClick={() =>
                router.push(
                  `/panel/product/add?category_id=${refValues.category_id}&sub_category_id=${refValues.sub_category_id}&sub_sub_category_id=${refValues.sub_sub_category_id}&brand_id=${refValues?.brand_id}`
                )
              }
            >
              Add New {prefix.singular}
            </Button>
          </div>
          <DataTable data={tableData} columns={columns} />
        </Card>
      )}
    </div>
  );
};

export default Managements;
