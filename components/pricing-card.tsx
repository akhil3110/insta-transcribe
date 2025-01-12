"use client"
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import axios from 'axios';
import Script from 'next/script';
import { Button } from './ui/button';
import toast from 'react-hot-toast';


declare global {
  interface Window {
    Razorpay: any
  }
}

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {

  const [isProcessing,setIsProcessing] = useState(false)
  const AMOUNT = 100

  const handlePayment = async () => {
    setIsProcessing(true);
  
    try {
      const response = await axios.post('/api/create-order');
      const orderId = response.data.orderId;
      
      if (!window.Razorpay) {
        console.error('Razorpay SDK not loaded');
        setIsProcessing(false);
        return;
      }
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 100,
        currency: 'INR',
        name: 'Insta_Transcribe',
        description: 'Upgrade Plan',
        order_id: orderId,
        handler: function (response: any) {
          console.log(response)
          toast.success('Payment Successful');
          // Handle success of payment
        },
        prefill: {
          name: 'Akhil',
          email: 'akhil1659@gmail.com',
          contact: '6546546546',
        },
        theme: {
          color: '#3399cc',
        },
      };
      //@ts-ignore
      const rzpi1 = new window.Razorpay(options);
      rzpi1.open();
    } catch (error) {
      console.error('Something went wrong: PRICING_CARD', error);
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div
      className={`relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ${
        plan.popular ? 'ring-2 ring-indigo-600' : ''
      }`}
    >
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {plan.popular && (
        <span className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white px-3 py-0.5 text-sm font-semibold rounded-full">
          Popular
        </span>
      )}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
          <span className="text-gray-600 dark:text-gray-400">/month</span>
        </div>
      </div>
      <div className='h-full'>
      <ul className="mt-8 space-y-4 h-[50%]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={handlePayment} 
        disabled= {isProcessing} 
        className="flex mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Get Started
      </Button>
      </div>
    </div>
  );
}