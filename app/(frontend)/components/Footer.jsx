"use client";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
import useSWR from "swr";

const footerItems = [
  {
    title: "Site Pages",
    items: [
      { title: "About Us", link: "/about-us" },
      { title: "Contact Us", link: "/contact-us" },
      { title: "Shipping Policy", link: "/shiping" },
    ],
  },
  {
    title: "Important Links",
    items: [
      { title: "Privacy Policy", link: "/PrivacyPolicy" },
      { title: "Terms and Conditions", link: "/tearmsAndCondition" },
      { title: "Refund Policy", link: "/refund-policy" },
    ],
  },
];

const socialLinks = [
  { icon: FaTelegram, title: "Telegram", link: "#" },
  { icon: FaFacebook, title: "Facebook", link: "#" },
  { icon: FaYoutube, title: "YouTube", link: "#" },
  { icon: FaInstagram, title: "Instagram", link: "#" },
  { icon: FaXTwitter, title: "Twitter", link: "#" },
  { icon: FaWhatsapp, title: "WhatsApp", link: "#" },
];

const Footer = () => {
  return (
    <div className="bg-[#e00065f2] text-white px-4 sm:px-6 lg:px-[100px] py-[50px]">
      <div className="flex w-full flex-col gap-7 justify-center">
        <div className="flex flex-col sm:flex-row flex-1 text-center sm:text-start sm:gap-10">
          {footerItems.map((item, index) => (
            <div key={index} className="mb-6 sm:mb-0">
              <h4 className="font-bold mb-4 mt-3">{item.title}</h4>
              <div className="space-y-3">
                {item.items.map((subItem, subIndex) => (
                  <Link
                    href={subItem.link}
                    className="block hover:underline"
                    key={subIndex}
                  >
                    <p className="text-sm mb-1">{subItem.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-center sm:text-end">
          <h1 className="text-xl font-black">Fynmart</h1>
          <div className="flex justify-center sm:justify-end gap-3">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={index} href={item.link}>
                  <Icon className="text-xl" title={item.title} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <hr className="col-span-2 hidden md:block border-white/50 my-6 opacity-20" />
      <div className="col-span-2 mt-5 space-y-3 sm:space-y-0 md:mt-0 flex flex-col sm:flex-row text-center sm:text-start justify-between">
        <p className="text-sm">
          © {new Date().getFullYear()} Fynmart | All right reserved
        </p>
        <p className="text-sm">
          Developed By{" "}
          <Link href="#" className="font-bold" target="_blank">
            Slayer
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
