import React from 'react';
import { Check } from 'lucide-react';

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
  return (
    <div
      className={`relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ${
        plan.popular ? 'ring-2 ring-indigo-600' : ''
      }`}
    >
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
      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
        Get Started
      </button>
    </div>
  );
}