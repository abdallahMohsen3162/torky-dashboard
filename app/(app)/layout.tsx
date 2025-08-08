"use client"
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Helper function to determine if link is active
  const isActiveLink = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation - Fixed positioning with proper z-index */}
    <Navbar />
      {/* Main content - flex-1 to take remaining space */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}