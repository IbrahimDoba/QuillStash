"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginImg from "../../../public/Assets/loginIMg.jpg";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface errorProps {
    identifier:string,
  password: string;

}

const LoginForm = () => {
    const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<errorProps>({
    identifier: "",
    password: "",
  });
  const [statusError, setStatusError] = useState<string>("");
 

  const schema = z.object({
    identifier: z.string().email("Invalid Username or Email "),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse({
      identifier,
      password,
    });
    console.log(result);

    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc: any, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errorMessages);
    } else {
      //   setErrors({});
      // Handle successful form submission
      console.log("Form data is valid", result.data);
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });
      console.log(res);

    
      if (res?.error) {
        setStatusError("Invalid Username / email or Password");
      } else {
        setStatusError("");
      }
    } catch (err: any) {
      console.log(err);
    }
    
  };

  return (
    <div className="flex  min-h-screen ">
      <div className="flex flex-1 flex-col justify-center w-full md:w-1/2 py-8 px-20  h-full shadow-xl mt-[5%] max-md:p-6">
        <h2 className="text-4xl font-bold mb-[10%] ">
          Welcome Back to SilverTech!
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {errors.identifier && (
            <p className="text-red-500 text-xs mb-2">{errors.identifier}</p>
          )}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mb-2">{errors.password}</p>
          )}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="subscribe"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor="newsletter"
              className="ml-2 block text-sm text-gray-900"
            >
              I want to receive emails about the product, feature updates,
              events, and marketing promotions.
            </label>
          </div>
          <p className="text-xl text-red-400 text-center my-3">{statusError}</p>
          <button
            type="submit"
            className="w-[40%] bg-black text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
          <p className="text-2xl my-3 w-[40%] text-center">Or</p>
         
        </form>
        <button onClick={() => signIn("google", {redirect: true})} className="w-[40%] flex justify-center items-center bg-white text-black py-2 px-4 rounded-md border border-blue-400">
            <span className="mr-4">
              <FcGoogle size={20} />
            </span>
            Login with Google
          </button>
        <p className="mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            Terms of use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <p className="mt-4">
          Dont have an account?{" "}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
      <div className="flex flex-1 max-md:hidden">
        <Image
          src={loginImg}
          alt="SilverTech SignUp Image"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginForm;
