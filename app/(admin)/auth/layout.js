import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative h-full hidden flex-col bg-muted p-10 text-white dark:border-r dark:border-r-zinc-700 lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 items-center font-medium">
            {/* <div className="px-1 overflow-hidden bg-[#ffcc00] w-[200px] rounded-xl">
              <Image
                src={"/assets/frame1s.png"}
                alt="Logo"
                width={900}
                height={900}
                className="w-[200px]"
              />
            </div> */}
            <div className="">
              <Image
                src={"/assets/ecom.png"}
                width={800}
                height={800}
                alt="ecom"
                className="w-[480px]"
              />
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-1">
              <p className="text-2xl">Management Panel</p>
              <footer className="text-sm">Powered By Fynmart</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 grid-bg">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
            {children}
            <p className="text-center text-sm text-muted-foreground">
              By clicking on login, you agree to our <br />
              <Link
                href="./terms-conditions"
                target="_blank"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="./privacy-policy"
                target="_blank"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
