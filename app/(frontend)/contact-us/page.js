import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-[100px] py-[50px]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 space-y-4">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-gray-600">
              If you have any questions, need assistance, or want to share
              feedback, our dedicated customer support team is here to help. We
              value your experience and are always ready to ensure your
              transactions are seamless and your information is protected at all
              times.
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
              Let&lsquo;s connect with us
            </button>
          </div>
          <div className="md:w-1/2 bg-blue-50 flex items-center justify-center">
            <img
              src="/assets/contact.jpg"
              alt="Contact illustration"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <MapPin className="text-gray-500 mb-2" size={24} />
            <h2 className="font-semibold text-lg">Address</h2>
            <p className="text-gray-600 text-center">Bechimari NH 15</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <Phone className="text-gray-500 mb-2" size={24} />
            <h2 className="font-semibold text-lg">Call Us</h2>
            <p className="text-gray-600">6003717166</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <Mail className="text-gray-500 mb-2" size={24} />
            <h2 className="font-semibold text-lg">Email Us</h2>
            <p className="text-gray-600">support@fynmart.in</p>
          </div>
        </div>

        <div className="p-6">
          <div className="w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.684546666895!2d92.17482757453006!3d26.626556376818826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375b3d1f84c271e7%3A0xc036445458e43ad3!2sBechimari!5e0!3m2!1sen!2sin!4v1724915042565!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
