import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-[100px] py-[50px] p-8">
      <div className=" bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </header>

        <main className="p-6 space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p className="text-gray-700">
              At FynMart accessible from https://fynmart.in, one of our main
              priorities is the privacy of our visitors. This Privacy Policy
              document contains types of information that is collected and
              recorded by FynMart and how we use it.
            </p>
            <p className="text-gray-700">
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us. This Privacy
              Policy applies only to our online activities and is valid for
              visitors to our website with regards to the information that they
              shared and/or collect in FynMart. This policy is not applicable to
              any information collected offline or via channels other than this
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Consent</h2>
            <p className="text-gray-700">
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Collecting your Information
            </h2>
            <p className="text-gray-700">
              When you visit the Site, we collect certain information about your
              device, your interaction with the Site, and the information
              necessary to process your purchases. We may also collect
              additional information if you contact us for customer support. In
              this Privacy Policy, we refer to any information that can uniquely
              identify an individual (including the information below) as
              “Personal Information”. See the list below for more information
              about what Personal Information we collect and why.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">
              Order information
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Examples of Personal Information collected: name, billing
                address, shipping address, payment information email address,
                and phone number.
              </li>
              <li>
                Purpose of collection: to provide products or services to you to
                fulfill our contract, to process your payment information,
                arrange for shipping, and provide you with invoices and/or order
                confirmations, communicate with you, screen our orders for
                potential risk or fraud, and when in line with the preferences
                you have shared with us, provide you with information or
                advertising relating to our products or services.
              </li>
              <li>Source of collection: collected from you.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">
              Customer support information
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Examples of Personal Information collected:</li>
              <li>Purpose of collection: to provide customer support.</li>
              <li> Source of collection: collected from you.</li>
              <li> Disclosure for a business purpose</li>
            </ul>
            {/* Add similar sections for Order information and Customer support information */}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Children&apos;s Information
            </h2>
            <p className="text-gray-700">
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity. FynMart does not knowingly collect any Personal
              Identifiable Information from children under age of 14. If you
              think that your child provided this kind of information on our
              website, we strongly encourage you to contact us immediately and
              we will do our best efforts to promptly remove such information
              from our records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Log Files</h2>
            <p className="text-gray-700">
              FynMart follows a standard procedure of using log files. These
              files log visitors when they visit websites. All hosting companies
              do this as part of their hosting service&apos;s analytics. The
              information collected by log files includes internet protocol (IP)
              addresses, browser type, Internet Service Provider (ISP), date and
              time stamp, referring/exit pages, and possibly the number of
              clicks. This information is not linked to any personally
              identifiable information. The purpose of collecting this
              information is for analyzing trends, administering the site,
              tracking users movement on the website, and gathering demographic
              information.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Advertising Partners Privacy Police
            </h2>
            <p className="text-gray-700">
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of FynMart. Third-party ad servers or ad
              networks uses technologies like cookies, JavaScript, or Web
              Beacons that are used in their respective advertisements and links
              that appear on FynMart, which are sent directly to user&apos;s
              browser. They automatically receive your IP address when this
              occurs. These technologies are used to measure the effectiveness
              of their advertising campaigns and/or to personalize the
              advertising content that you see on websites that you visit. Note
              that FynMart has no access to or control over these cookies that
              are used by third-party advertisers.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Third Party Privacy Polices
            </h2>
            <p className="text-gray-700">
              FynMart&apos;s Privacy Policy does not apply to other advertisers
              or websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about
              how to opt-out of certain options. You can choose to disable
              cookies through your individual browser options. To know more
              detailed information about cookie management with specific web
              browsers, it can be found at the browser&apos;s respective
              websites.
            </p>
          </section>
          {/* Add more sections for Log Files, Advertising Partners, Third Party Policies, etc. */}

          <section>
            <h2 className="text-2xl font-semibold mb-3">Do Not Track</h2>
            <p className="text-gray-700">
              Please note that because there is no consistent industry
              understanding of how to respond to “Do Not Track” signals, we do
              not alter our data collection and usage practices when we detect
              such a signal from your browser.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Changes</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal, or regulatory reasons.{" "}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-700">
              For more information about our privacy practices, if you have
              questions, or if you would like to make a complaint, please
              contact us by e-mail at support@Fynmart.in.
            </p>
          </section>
        </main>

        <footer className="bg-gray-200 p-6 text-center text-gray-600">
          <p>
            If you are not satisfied with our response to your complaint, you
            have the right to lodge your complaint with the relevant data
            protection authority. You can contact your local data protection
            authority, or our supervisory authority here:
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
