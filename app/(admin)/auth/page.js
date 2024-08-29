import Login from "./components/login";

export default function Home() {
  return (
    <>
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-center tracking-tight mb-1">
          Login to your account
        </h1>
        <p className="text-sm text-center text-muted-foreground mb-3">
          Enter your credentials to login to your dashboard
        </p>
        <Login />
      </div>
    </>
  );
}
