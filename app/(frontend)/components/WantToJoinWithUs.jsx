import Link from "next/link";
import React from "react";
import Image from "next/image";
import DeliveryImage from "../../../public/assets/deliverys.png";
// import SellerImage from '../../public/assets/seller.png';
// import RetailerImage from '../../public/assets/retailer.png';
// import WholesalerImage from '../../public/assets/holseller.jpg';

const WantToJoinWithUs = () => {
  return (
    <div className="lg:px-[100px] md:px-[50px] px-4 md:py-[30px] py-8 bg-[#fce7f386]">
      <div className="text-center space-y-2">
        <h1 className="md:text-[30px] text-[17px] font-bold">
          Let&apos;s Start your business with
          <span className="text-[#039d4b]"> Fynmart</span>
        </h1>
        <p className="md:font-bold text-[17px] text-gray-500">
          Join our online marketplace revolution and boost your business
        </p>
      </div>

      <div className="flex items-center justify-center mt-5 md:hidden block">
        <Image
          src={DeliveryImage}
          alt="Delivery Partner"
          className="w-[130px] object-cover md:w-[200px] shrink-0"
          width={270}
          height={200}
        />
      </div>

      <div className="md:block hidden">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {/* <div className='flex md:flex-col items-center justify-center my-3'>
            <Image
              src={DeliveryImage}
              alt='Become a Customer'
              className='w-[150px] md:w-[200px] shrink-0'
              width={200}
              height={200}
            />
            <h1 className='md:text-[20px] text-center text-[15px] text-nowrap md:font-bold'>
              Become a Customer
            </h1>
          </div> */}

          <div className="flex md:flex-col items-center justify-center my-3">
            <Image
              src={DeliveryImage}
              alt="Become a Retailer"
              className="w-[150px] md:w-[200px] shrink-0"
              width={200}
              height={200}
            />
            <h1 className="md:text-[20px] text-center text-[15px] text-nowrap md:font-bold">
              Become a Retailer
            </h1>
          </div>

          <div className="flex md:flex-col items-center justify-center my-3">
            <Image
              src={DeliveryImage}
              alt="Become a Wholesaler"
              className="w-[150px] md:w-[200px] shrink-0"
              width={200}
              height={200}
            />
            <h1 className="md:text-[20px] text-center text-[15px] text-nowrap md:font-bold">
              Become a Wholesaler
            </h1>
          </div>

          <div className="flex md:flex-col items-center justify-center my-3">
            <Image
              src={DeliveryImage}
              alt="Become a Delivery Partner"
              className="w-[150px] md:w-[200px] shrink-0"
              width={200}
              height={200}
            />
            <h1 className="md:text-[20px] text-center text-[15px] text-nowrap md:font-bold">
              Become a Delivery Partner
            </h1>
          </div>
        </div>
      </div>

      <div className="button flex items-center flex-col justify-center">
        <h1 className="text-center text-[23px] text-nowrap md:font-bold my-3">
          Would you like to be join with us
        </h1>
        <Link
          href={"/join/seller"}
          className="md:px-3 px-5 py-3 rounded-lg bg-[#039d55] text-white md:font-medium"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default WantToJoinWithUs;
