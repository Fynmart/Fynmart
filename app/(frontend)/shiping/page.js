import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-[100px] py-[50px] p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-green-600 text-white p-6">
          <h1 className="text-3xl font-bold">Shipping Policy</h1>
        </header>
        <main className="p-6 space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold mb-3">Is Shipping Free?</h2>
            <p className="text-gray-700">
              Yes, Shipping is FREE for orders within ASSAM only.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              When Will I Receive My Order?
            </h2>
            <p className="text-gray-700">
              Orders are shipped out directly from our warehouses, and we strive
              to process them as quickly as possible. Due to the popularity of
              our offers, please allow an estimated 4-7 days for your order to
              arrive.
            </p>
            <p className="text-gray-700 mt-2">
              For most serviceable pin codes, we aim to deliver within 7 days.
              However, due to unforeseen circumstances such as weather, strikes,
              remote locations, stocking issues, or any other reason, it may
              take longer.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Why Is My Order Being Shipped in Different Packages?
            </h2>
            <p className="text-gray-700">
              If you have a multi-item order, each item may be shipped from a
              different warehouse, depending on which one has them available the
              fastest. Alternatively, if an item is popular and on a bit of a
              backorder, we might ship your items at different times, in
              different packages, to prevent holding up your order and to get it
              to you as fast as possible!
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              What Happens If My Order Gets Stuck or Lost in the Mail?
            </h2>
            <p className="text-gray-700">
              All of our orders are sent with insured shipping and handling. If
              an order gets stuck somewhere, sent back, or even lost during the
              delivery process, we apologize! While the postal service is out of
              our control, we have measures in place to address such situations.
            </p>
            <p className="text-gray-700 mt-2">
              In cases like this, because the packages are insured, we will send
              you a new package with quicker shipping and full tracking, if
              possible. Please refer to our refund and return policy for more
              information on when these might be applicable to shipping
              situations.
            </p>
          </section>
        </main>
        <footer className="bg-gray-200 p-6 text-center text-gray-600">
          <p>This Shipping Policy was last updated on August 29, 2024.</p>
        </footer>
      </div>
    </div>
  );
};

export default ShippingPolicy;
