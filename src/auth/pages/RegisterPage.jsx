import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useAuth } from "../../hooks/useAuth";

export function RegisterPagePage() {
  const { register, setEmail, setPassword, setName, setLastName, errorMessage } = useAuth();

  async function handleSignUp(e) {
    e.preventDefault();
    register();
  }

  return (
    <main className="flex flex-row-reverse w-full h-full bg-[#F9FAFB]">
      <section className="w-1/2 h-screen flex flex-col justify-center px-20 max-w-[600px] mx-auto">
        <div className="mb-12">
          <h1 className="font-satoshi font-medium text-3xl">Get Started Now</h1>
          <p className="font-satoshi font-medium text-base">
            It is time to create your account for upgrade Roddan
          </p>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          isRequired
          type="text"
          variant="bordered"
          label="Name"
          placeholder="Enter your name"
          labelPlacement="outside"
          className="font-satoshi mb-6"
        />
        <Input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          isRequired
          type="text"
          variant="bordered"
          label="Last Name"
          placeholder="Enter your last name"
          labelPlacement="outside"
          className="font-satoshi mb-6"
        />
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
            handleSignUp(e);
          }}
          className="font-satoshi w-full bg-[#0081FE] text-white"
        >
          Register
        </Button>
      </section>
      <section className="w-1/2">
        <video
          className="w-full h-screen object-center object-cover rounded-tr-[20px] rounded-br-[20px]"
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
