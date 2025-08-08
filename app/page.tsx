"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/hello"; // Redirect to login page
    }
  }, []);
  return (
    <div className="space-y-6">
 
      

    </div>
  );
}