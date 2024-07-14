import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const { login, setEmail, setPassword, errorMessage /*providerLogin*/ } = useAuth();

  async function handleSignIn(e) {
    e.preventDefault();
    login();
  }

  /*const handleProviderLogin = () => {
    providerLogin();
  };
  */

  return (
    <main className="flex w-full h-full bg-[#F9FAFB]">
      <section className="w-1/2 h-screen flex flex-col justify-center px-20 max-w-[600px] mx-auto">
        <div className="mb-12">
          <h1 className="font-satoshi font-medium text-3xl">Welcome back!</h1>
          <p className="font-satoshi font-medium text-base">
            Enter your Credentials to access your account
          </p>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          isRequired
          type="email"
          variant="bordered"
          label="Email address"
          placeholder="Enter your email address"
          labelPlacement="outside"
          className="font-satoshi mb-6"
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          isRequired
          type="password"
          variant="bordered"
          label="Password"
          placeholder="Enter your password"
          labelPlacement="outside"
          className="font-satoshi mb-12"
        />
        <Button
          onClick={(e) => {
            handleSignIn(e);
          }}
          className="font-satoshi w-full bg-[#0081FE] text-white"
        >
          Login
        </Button>
        {/*  <Button
          onClick={handleProviderLogin}
          className="font-satoshi w-full bg-[#0081FE] text-white"
        >
          Google
        </Button> */}
      </section>
      <section className="w-1/2">
        <video
          className="w-full h-screen object-center object-cover rounded-tl-[20px] rounded-bl-[20px]"
          autoPlay
          muted
          loop
        >
          <source src="/videos/login-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </section>
    </main>
  );
}
