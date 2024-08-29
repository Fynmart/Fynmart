"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { subSubCategorySchema } from "@/lib/form-schema";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/imdos-components/DataTable";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import FormModal from "@/components/imdos-components/FormModal";
import { useImdosUI } from "@/providers/ImdosProvider";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const prefix = {
  title: "Sub Sub Categories",
  description: "Select the item to manage the content",
  singular: "Sub Sub Category",
  uid: "sub_sub_categories",
  endpoint: "/api/imdos/sub_sub_categories/read",
  schema: subSubCategorySchema,
};

const Category = () => {
  const { formModal, setFormModal, setConfirmAlert } = useImdosUI();
  const { data, error, mutate } = useSWR(prefix.endpoint, fetchData);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  async function getCategories() {
    try {
      const formData = new FormData();
      formData.append(
        "select",
        JSON.stringify(["id as value", "name as label"])
      );

      const request = await fetch("/api/imdos/categories/read", {
        method: "POST",
        body: formData,
      });

      const response = await request.json();
      setCategories(response.data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getSubCategories(category_id) {
    console.log(category_id);
    try {
      const formData = new FormData();
      formData.append(
        "select",
        JSON.stringify(["id as value", "name as label"])
      );
      formData.append(
        "conditions",
        JSON.stringify([
          {
            on: "category_id",
            type: "=",
            value: category_id,
          },
        ])
      );

      const request = await fetch("/api/imdos/sub_categories/read", {
        method: "POST",
        body: formData,
      });

      const response = await request.json();
      setSubCategories(response.data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getSubCategories(formModal?.data?.category_id);
  }, [formModal?.data]);

  async function fetchData() {
    try {
      const formData = new FormData();
      formData.append(
        "select",
        JSON.stringify([
          "sub_sub_categories.id",
          "sub_sub_categories.name",
          "sub_sub_categories.priority",
          "sub_sub_categories.created_at",
          "sub_categories.name as sub_category_name",
          "sub_categories.id as sub_category_id",
          "categories.name as category_name",
          "categories.id as category_id",
        ])
      );
      formData.append(
        "join",
        JSON.stringify([
          {
            table: "sub_categories",
            on: ["sub_sub_categories.sub_category_id", "sub_categories.id"],
            type: "LEFT",
          },
          {
            table: "categories",
            on: ["sub_categories.category_id", "categories.id"],
            type: "LEFT",
          },
        ])
      );

      const request = await fetch(prefix.endpoint, {
        method: "POST",
        body: formData,
      });

      const response = await request.json();
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

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
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => <div>{row.getValue("priority")}</div>,
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
                  setFormModal({ show: true, data: row.original });
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

  const inputFields = [
    {
      title: "Sub Sub Category Name",
      type: "text",
      uid: "name",
      default: formModal?.data?.name ?? "",
    },
    {
      title: "Priority",
      type: "dropdown",
      uid: "priority",
      default: formModal?.data?.priority ?? "",
      items: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
        {
          label: "5",
          value: "5",
        },
      ],
    },
    {
      title: "Main Category",
      type: "dropdown",
      uid: "category_id",
      default: formModal?.data?.category_id ?? "",
      items: categories ?? [],
      onChange: (value) => {
        getSubCategories(value);
      },
    },
    {
      title: "Sub Category",
      type: "dropdown",
      uid: "sub_category_id",
      default: formModal?.data?.sub_category_id ?? "",
      items: subCategories ?? [],
    },
  ];

  const onSubmit = async (value) => {
    try {
      const formData = new FormData();
      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, val);
      });

      formData.append("fileUpload", true);
      formData.append("fileDestination", "Categories");
      formData.append("fileValidation", ["jpg", "jpeg", "png"]);

      if (formModal?.data?.id) formData.append("refId", formModal?.data?.id);

      const endpoint = formModal?.data?.id
        ? `/api/imdos/${prefix.uid}/update`
        : `/api/imdos/${prefix.uid}/create`;
      const request = await fetch(endpoint, { method: "POST", body: formData });

      const response = await request.json();

      if (!request.ok) {
        throw new Error(response.message);
      }
      setConfirmAlert("");
      setFormModal({ show: false });
      mutate();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start md:flex-row md:items-center justify-between">
            <div className="mb-3 md:mb-0">
              <CardTitle>List of {prefix.title}</CardTitle>
              <CardDescription>{prefix.description}</CardDescription>
            </div>
            <Button onClick={() => setFormModal({ show: true })}>
              Add {prefix.singular}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable data={data} columns={columns} />
        </CardContent>
      </Card>
      <FormModal
        title={`Manage ${prefix.singular}`}
        description={`Make changes to the ${prefix.singular.toLocaleLowerCase()} here. Click save when you're done.`}
        form={{
          fields: inputFields,
          schema: prefix.schema,
          onSubmit: onSubmit,
        }}
      />
    </>
  );
};

export default Category;
