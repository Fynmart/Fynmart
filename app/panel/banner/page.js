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

import { bannerSchema } from "@/lib/form-schema";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/imdos-components/DataTable";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import FormModal from "@/components/imdos-components/FormModal";
import { useImdosUI } from "@/providers/ImdosProvider";
import useSWR from "swr";
import toast from "react-hot-toast";
import { PATH_URL } from "@/lib/utils";

const prefix = {
  title: "Banner Setup",
  description: "Select the item to manage the content",
  singular: "Banner",
  uid: "banners",
  endpoint: "/api/imdos/banners/read",
  schema: bannerSchema,
};

const Product = () => {
  const { formModal, setFormModal, setConfirmAlert } = useImdosUI();
  const { data, error, mutate } = useSWR(prefix.endpoint, fetchData);

  async function fetchData() {
    try {
      const formData = new FormData();
      formData.append(
        "select",
        JSON.stringify(["id", "name", "type", "priority", "file", "created_at"])
      );

      const request = await fetch(prefix.endpoint, {
        method: "POST",
        body: formData,
      });

      const response = await request.json();
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
      accessorKey: "file",
      header: "Banner",
      cell: ({ row }) => (
        <div className="w-[250px]">
          <img src={PATH_URL + row.getValue("file")} className="rounded-xl" />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => <div>{row.getValue("priority")}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
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
      title: "Banner Type",
      type: "dropdown",
      uid: "type",
      default: formModal?.data?.type ?? "",
      items: [
        {
          label: "Global Banner",
          value: "global_banner",
        },
        {
          label: "App Banner",
          value: "app_banner",
        },
        {
          label: "Main Banner",
          value: "main_banner",
        },
        {
          label: "Popup Banner",
          value: "popup_banner",
        },
        {
          label: "Footer Banner",
          value: "footer_banner",
        },
        {
          label: "Top Side Banner",
          value: "top_side_banner",
        },
      ],
    },
    {
      title: "Banner Name",
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
      title: "Upload Banner ( height :416 width :416 image is required )",
      type: "file",
      uid: "file",

      default: formModal?.data?.file ?? "",
    },
  ];

  const onSubmit = async (value) => {
    try {
      const formData = new FormData();
      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, val);
      });

      formData.append("fileUpload", true);
      formData.append("fileDestination", "banners");
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

export default Product;
