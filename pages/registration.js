import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/router";
import { supabase } from "@/components/supabaseClient";

// Initialize Supabase client

export default function PatientRegistration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const generateNHSNumber = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nhsNumber = generateNHSNumber();

    try {
      const { data, error } = await supabase
        .from("Patient")
        .insert([
          { First_Name: firstName, Last_Name: lastName, NHS_id: nhsNumber },
        ])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const { data: Process, error: Process_Error } = await supabase
          .from("Patient_Process")
          .insert([{ Process_id: 7476, Patient_id: data[0].Patient_id }]);

        localStorage.setItem("patientId", data[0].Patient_id);
        router.push("/follow-up");
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center px-5 h-full">
      <div className="w-full mt-4 p-4 text-left bg-white border-2 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Patient Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="py-4 mt-4 w-full text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Register
              </button>
            </div>
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
