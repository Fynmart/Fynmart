import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-[100px] py-[50px]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Refund Policy</h1>
        </header>

        <main className="p-6 space-y-6">
          <section className="space-y-3">
            <p className="text-gray-700">
              In order to process a return or an exchange, please contact us for
              a return authorization. We accept returns and exchanges within 3
              DAYS of delivery. The returned items must be received in new,
              unused condition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Returns & Exchanges</h2>
            <p className="text-gray-700">
              We offer easy returns & exchanges on all orders. To return an
              item, please contact us and Send us the video you made when you
              received the item from the delivery boy via WhatsApp and we will
              generate a return authorization for you. Returns are only accepted
              for items purchased directly from our website. The item(s) must be
              unused and in original packaging.
            </p>
            <p className="text-gray-700 mt-3">
              To complete an exchange, place your return/replace request, once
              the request is placed we will arrange a reverse pick up for the
              product and issue a replacement with the correct product once the
              damaged product is picked up by our logistics partner. This entire
              process should take around 2-3 working days.
            </p>
            <p className="text-gray-700 mt-3">
              Once we receive the return order, it will take 3-5 business days
              for a refund to appear on your statement. If 3-5 business days
              have passed and you still don&apos;t see a refund, please feel
              free to contact us at <strong>support@fynmart.in</strong> or
              WhatsApp us at <strong>6003717166</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Invalid Reasons</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>
                Buyer no longer wants the items - this is the most common
                example which we cannot honor if we want to continue offering
                great value at FynMart. The buyer should make sure he or she
                wants to buy the items before submitting an order, not after.
                After an order is submitted, the buyer enters into a legally
                binding contract with the seller to purchase all items in that
                order.
              </li>
              <li>
                The buyer should be confident that he or she is ready to pay the
                asking prices before submitting an order. After an order is
                submitted, the buyer enters into a legally binding contract with
                the seller to purchase all items in that order.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Cancellations</h2>
            <p className="text-gray-700">
              In the event you wish to cancel your order, please contact us. If
              the order has already shipped, we would be unable to stop the
              package.
            </p>
          </section>
        </main>

        <footer className="bg-gray-200 p-6 text-center text-gray-600">
          <p>Last updated: [Insert Date]</p>
        </footer>
      </div>
    </div>
  );
};

export default RefundPolicy;
