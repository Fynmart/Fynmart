"use client";
import useSWR from "swr";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadExcel } from "react-export-table-to-excel";
import { Trash, FileText, Download } from "lucide-react";
import DataTable from "@/components/imdos-components/DataTable";
import { useImdosUI } from "@/providers/ImdosProvider";
import TableSkeleton from "@/components/imdos-components/TableSkeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PATH_URL } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const prefix = {
  uid: "cart_items",
  endpoint: "/api/imdos/cart_items/read",
};

const ShippingLabelReceipt = ({ cartItem }) => {
  const items = Array.isArray(JSON.parse(cartItem.items))
    ? JSON.parse(cartItem.items)
    : [];

  const receiptRef = useRef(null);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleDownload = async () => {
    const element = receiptRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    const fullHDWidth = 1920;
    const fullHDHeight = 1080;

    const scaledWidth = pdfWidth;
    const scaledHeight = (fullHDHeight * pdfWidth) / fullHDWidth;

    pdf.addImage(data, "PNG", 0, 0, scaledWidth, scaledHeight);
    pdf.save("shipping_label_receipt.pdf");
  };

  const itemTitles = items.map((item) => item.title).join(", ");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <FileText size={18} />
          Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] max-h-[80vh] overflow-y-auto">
        <Card>
          <CardContent className="p-3" ref={receiptRef}>
            {/* Shipping Label Section */}
            <div className="">
              <img
                src="/assets/Logo.png"
                alt="FynMart Logo"
                className=" h-[200px] "
              />
              <div className="flex justify-between mb-2 gap-5">
                <div className="w">
                  <p>
                    <strong>Ship To:</strong> {cartItem.user_name}
                  </p>
                  <p>{cartItem.user_address}</p>
                  <p>
                    <strong>Phone:</strong> {cartItem.user_phone}
                  </p>
                  <p>
                    <strong>Item:</strong> {itemTitles}
                  </p>
                  <p>
                    <strong>Weight:</strong> 0.46 | <strong>Dimensions:</strong>{" "}
                    15x15x10
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(cartItem.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-[430px] ">
                  <p>
                    <strong>Payment:</strong>{" "}
                    {items?.[0]?.payment_method || "N/A"}
                  </p>
                  <p>
                    <strong>Order Id:</strong> {items?.[0]?.orderId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Receipt Section */}
            <h2 className="text-2xl font-bold mb-4">Receipt</h2>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-left">Item</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">₹{item.price}</td>
                    <td className="text-right">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right">
              <p>
                <strong>Total: ₹{calculateTotal()}</strong>
              </p>
            </div>
            <h1 className="mt-3">
              <strong>Customer Self-Declaration : {cartItem.user_name}</strong>
            </h1>
            <h1 className="my-3">
              I hereby confirm that the contents of this package are being
              purchased for my internal and personal use and not for resale. I
              further understand and agree to the terms and conditions of this
              website.
            </h1>
          </CardContent>
        </Card>

        <Button onClick={handleDownload} className="mt-4 w-full">
          <Download size={18} className="mr-2" />
          Download Shipping Label & Receipt
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const Product = () => {
  const tableRef = useRef(null);
  const [open, setOpen] = React.useState(false);

  const { formModal, setFormModal, setConfirmAlert } = useImdosUI();
  const { data, error, mutate } = useSWR(prefix.endpoint, fetchData);

  function handleDownloadExcel() {
    const transformedData = data.map((entry, index) => {
      const items = JSON.parse(entry.items);
      const itemTitles = items.map((item) => item.name).join(", ");

      return {
        serial: index + 1,
        user_name: entry.user_name,
        user_phone: entry.user_phone,
        user_email: entry.user_email,
        items: itemTitles,
        created_at: entry.created_at,
      };
    });

    downloadExcel({
      fileName: "order_list",
      sheet: "Order List",
      tablePayload: {
        header: [
          "Serial",
          "User Name",
          "Phone",
          "Email",
          "Items",
          "Created At",
        ],
        body: transformedData,
      },
    });
  }

  async function fetchData() {
    try {
      const formData = new FormData();

      formData.append(
        "select",
        JSON.stringify([
          "cart_items.id",
          "cart_items.items",
          "cart_items.user_id",
          "users.name as user_name",
          "users.address as user_address",
          "users.phone as user_phone",
          "users.email as user_email",
          "cart_items.created_at",
        ])
      );

      formData.append(
        "join",
        JSON.stringify([
          {
            table: "users",
            on: ["cart_items.user_id", "users.id"],
            type: "INNER",
          },
        ])
      );

      formData.append("order", JSON.stringify({ on: "id", type: "DESC" }));

      const request = await fetch(prefix.endpoint, {
        method: "POST",
        body: formData,
      });

      const response = await request.json();
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
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
      accessorKey: "user_name",
      header: "User Name",
      cell: ({ row }) => <div>{row.getValue("user_name")}</div>,
    },
    // {
    //   accessorKey: "user_address",
    //   header: "User Address",
    //   cell: ({ row }) => <div>{row.getValue("user_address")}</div>,
    // },
    // {
    //   accessorKey: "user_phone",
    //   header: "User Phone",
    //   cell: ({ row }) => <div>{row.getValue("user_phone")}</div>,
    // },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
    },
    {
      id: "receipt",
      header: "Receipt",
      cell: ({ row }) => <ShippingLabelReceipt cartItem={row.original} />,
    },
    {
      accessorKey: "items",
      header: "Products",
      cell: ({ row }) => {
        const items = Array.isArray(JSON.parse(row.getValue("items")))
          ? JSON.parse(row.getValue("items"))
          : [];

        return (
          <div className="p-5">
            <Dialog>
              <DialogTrigger>View Products</DialogTrigger>
              <DialogContent className="p-3 rounded-lg w-[90%]">
                <div className="text-start max-h-[50vh] mt-2 overflow-y-scroll no-scrollbar">
                  {items.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-items-start gap-5 h-[150px] w-[150px] md:h-[250px] md:w-[250px] border-b-2"
                    >
                      <img
                        src={
                          PATH_URL + product?.image || "/placeholder-image.jpg"
                        }
                        alt={product.title || "Product image"}
                        className="h-full ml-0 w-full object-cover rounded-lg py-3"
                      />
                      <div className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]">
                        <h3 className="text-[18px] truncate">
                          {product.title}
                        </h3>
                        <p className="text-[12px] truncate">
                          Item ID: {product.id}
                        </p>
                        <p className="text-[12px] truncate">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-[12px] truncate">
                          Price: {product.price}
                        </p>
                        <p className="text-[12px] truncate">
                          Size: {product.size}
                        </p>
                        <p className="text-[12px] truncate">
                          Color: {product.color}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setOpen(!open)}>Done</Button>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Button
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
          </Button>
        );
      },
    },
  ];

  if (!data) {
    return <TableSkeleton loop={5} />;
  }

  return (
    <>
      <Card>
        <CardContent>
          <h1 className="float-start my-3">Download order list</h1>
          <Button onClick={handleDownloadExcel} className="float-end my-3">
            Export Data
          </Button>
          <DataTable data={data} columns={columns} ref={tableRef} />
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
