"use client";
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import Script from "next/script";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { updatePlan } from "@/actions/updatePlan";
import { Plan } from "@prisma/client";

interface PricingPlan {
  name: string;
  price: string; // Price in USD by default
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  currentPlan: string;
  name: string;
  email: string;
}

export function PricingCard({ plan, currentPlan, name, email }: PricingCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currency, setCurrency] = useState<keyof typeof currencyMap>("USD");
  const [convertedPrice, setConvertedPrice] = useState(parseFloat(plan.price)); // Start with USD price

  const currencyMap = {
    USD: "$",
    INR: "₹",
    EUR: "€",
  };

  const convertCurrency = async (toCurrency: string) => {
    if (toCurrency === "USD") {
      setConvertedPrice(parseFloat(plan.price)); // Reset to base price in USD
      return;
    }

    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );

      const rate = response.data.rates[toCurrency];
      const newPrice = parseFloat(plan.price) * rate;
      setConvertedPrice(Math.round(newPrice)); // Update price with conversion
    } catch (error) {
      console.error("Error fetching currency rates:", error);
      toast.error("Failed to convert currency. Please try again.");
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await axios.post("/api/create-order", {
        amount: convertedPrice * 100, // Convert to smallest currency unit
        currency: currency,
      });

      const orderId = response.data.orderId;

      //@ts-expect-error: razorpay error
      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: convertedPrice * 100,
        currency: currency,
        name: "Insta_Transcribe",
        description: `Upgrade Plan to ${plan.name}`,
        order_id: orderId,
        //@ts-expect-error: razorpay error
        handler: async function (response) {
          console.log("Payment successful:", response);
          toast.success("Payment Successful");
  
          try {
            const result = await updatePlan(email, plan.name as Plan); 
            if (result) {
              toast.success("Plan updated successfully!");
            } else {
              toast.error("Failed to update the plan.");
            }
          } catch (error) {
            console.error("Error updating plan:", error);
            toast.error("Failed to update the plan. Please contact support.");
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      //@ts-expect-error: razor pay erorr
      const rzpi1 = new window.Razorpay(options);
      //@ts-expect-error: response type
      rzpi1.on("payment.failed", function (response) {
        
        console.error("Payment failed:", response.error);
        toast.error("Payment Failed: " + response.error.description);
      });
      rzpi1.open();
    } catch (error) {
      console.error("Something went wrong: PRICING_CARD", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    convertCurrency(currency);
  }, [currency]);

  return (
    <div
      className={`relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ${
        plan.popular ? "ring-2 ring-indigo-600" : ""
      }`}
    >
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      {plan.popular && (
        <span className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white px-3 py-0.5 text-sm font-semibold rounded-full">
          Popular
        </span>
      )}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {currencyMap[currency]} {convertedPrice}
          </span>
          <span className="text-gray-600 dark:text-gray-400">/month</span>
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="currency-select" className="block text-gray-700 dark:text-gray-300 mb-2">
          Select Currency:
        </label>
        <select
          id="currency-select"
          value={currency}
          onChange={(e) => {
            //@ts-expect-error: curreny type
            setCurrency(e.target.value)
          }}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="USD">USD - United States Dollar</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="EUR">EUR - Euro</option>
        </select>
      </div>
      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <Button
          onClick={handlePayment}
          disabled={isProcessing || currentPlan === plan.name}
          className={cn(
            "mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors",
            currentPlan === plan.name && "cursor-not-allowed hover:bg-indigo-600"
          )}
        >
          {currentPlan === plan.name ? "Current Plan" : isProcessing ? "Processing..." : "Get Started"}
        </Button>
      </div>
    </div>
  );
}
