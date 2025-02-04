"use client"; // Required for client-side interactivity

import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
        // Save email to your database
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          // Handle duplicate email error
          if (data.error === "Email already exists") {
            toast.error("You're already subscribed!");
            setEmail("");
          } else {
            throw new Error(data.error || "Failed to subscribe.");
          }
          return;
        }
  
        toast.success("Thank you for subscribing!");
        setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setEmail("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-8 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-primary">
        Stay Updated with QuillStash
      </h2>
      <p className="mb-6 text-gray-600">
        Stay updated with the latest in SaaS, AI advancements, and more.
        Subscribe to our newsletter for exclusive insights and trends from Quillstash!
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isLoading}
        />
       <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};
