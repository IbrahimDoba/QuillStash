"use client";
import Image from "next/image";
import React, { useState } from "react";
import loginImg from "../../../public/Assets/loginIMg.jpg";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";

interface errorProps {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface ImageData {
  userImage: File | any;
}

const SignupForm = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<errorProps>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [statusError, setStatusError] = useState<string>("");
  const [profileImage, setProfileImage] = useState<ImageData>({
    userImage: null,
  });

  const router = useRouter();

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .refine((val) => val === password, {
        message: "Passwords do not match",
      }),
  });

  const handleUserProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfileImage({
      ...profileImage,
      userImage: file,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = schema.safeParse({
      name,
      username,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc: any, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errorMessages);
    } else {
      setErrors({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage.userImage) {
        formData.append("profileImage", profileImage.userImage);
      }

      try {
        const res = await axios.post("/api/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 400) {
          setStatusError("This email/user is already registered");
        } else if (res.status === 200) {
          setStatusError("");
          router.push("/auth/login");
        }
      } catch (err: any) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center w-full md:w-1/2 py-8 px-20 h-full shadow-xl mt-[3%] max-md:p-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to SilverTech</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleUserProfileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mb-2">{errors.username}</p>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mb-2">{errors.email}</p>
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
            <div className="flex">
              <li className="text-xs text-gray-500 mr-2 mt-1">
                Must be 8 or more characters.
              </li>
              <li className="text-xs text-gray-500 mr-2 mt-1">
                Must contain one uppercase.
              </li>
              <li className="text-xs text-gray-500 mt-1">
                Must contain one lowercase.
              </li>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mb-2">{errors.password}</p>
          )}

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mb-2">
              {errors.confirmPassword}
            </p>
          )}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="subscribe"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor="subscribe"
              className="ml-2 block text-sm text-gray-900"
            >
              I want to receive emails about the product.
            </label>
          </div>
          <p className="text-xl text-red-400 text-center my-3">{statusError}</p>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md"
          >
            Create an account
          </button>
          <p className="text-2xl my-3 text-center">Or</p>
        </form>
        <button
          onClick={() => signIn("google", { redirect: true })}
          className="w-full flex justify-center items-center bg-white text-black py-2 px-4 rounded-md border border-blue-400"
        >
          <span className="mr-4">
            <FcGoogle size={20} />
          </span>
          Signup with Google
        </button>
        <p className="mt-4">
          By creating an account, you agree to the{" "}
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
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
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

export default SignupForm;
