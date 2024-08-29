"use client";
import Sidebar from "@/components/imdos-components/Sidebar";
import TopBar from "@/components/imdos-components/Topbar";
import { ThemeProvider } from "@/providers/ThemeProvider";

const sidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: "LayoutGrid",
        url: "/panel/dashboard",
      },
    ],
  },
  {
    title: "Product Management",
    items: [
      {
        label: "Categories",
        icon: "Box",
        url: "/panel/category",
      },
      {
        label: "Sub Categories",
        icon: "Box",
        url: "/panel/sub-category",
      },
      {
        label: "Manage Brands",
        icon: "Box",
        url: "/panel/brands",
      },
      {
        label: "Manage Banner",
        icon: "Box",
        url: "/panel/banner",
      },
      {
        label: "Manage Products",
        icon: "ShoppingBasket",
        url: "/panel/product",
      },
    ],
  },

  // {
  //   title: "User Management",
  //   items: [
  //     {
  //       label: "Customers List",
  //       icon: "Box",
  //       url: "/panel/customers-list",
  //     },
  //   ],
  // },
  {
    title: "Frontend About Section",
    items: [
      {
        label: "Order",
        icon: "UsersRound",
        url: "/panel/orders",
      },
      {
        label: "Want To Join",
        icon: "UsersRound",
        url: "/panel/want-to-join",
      },
    ],
  },
  {
    title: "Order Management",
    items: [
      {
        label: "Orders Successful",
        icon: "Box",
        url: "/",
      },
    ],
  },
  {
    title: "Helps & Support",
    items: [
      {
        label: "Inbox",
        icon: "MailPlus",
        url: "/",
      },
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TopBar siteName={"Fynmart"} />
        <div className="flex">
          <Sidebar links={sidebarItems} />
          <div className="children flex-1 md:ml-[300px] p-3 ">{children}</div>
        </div>
      </ThemeProvider>
    </div>
  );
}
