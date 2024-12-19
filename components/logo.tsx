import React from 'react';
import { Smartphone } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Smartphone className="w-6 h-6 text-indigo-600" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Insta<span className="text-indigo-600">Transcribe</span>
      </span>
    </div>
  );
}