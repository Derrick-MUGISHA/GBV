"use client";
import React, { useState } from "react";
import gray from "@/app/assets/GRAY.png";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const subpage1 = ['Volunteer', 'Donate', 'Partnership'];
const subpage2 = ['How it works', 'Get Started', 'Help'];

function DesktopDropdown({ title, items }: { title: string; items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const parentPath = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-transparent text-base font-normal"
          >
            {title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white text-black rounded-lg shadow-lg w-48 border-none mt-2"
          align="start"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {items.map((item) => {
            const itemPath = item.toLowerCase().replace(/\s+/g, '-');
            return (
              <DropdownMenuItem
                key={item}
                className="hover:bg-gray-100 px-4 py-2.5 cursor-pointer"
              >
                <Link href={`/${parentPath}/${itemPath}`} className="w-full">
                  {item}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="relative">
      <header className="bg-[#b062b0d7] flex justify-between items-center px-4 h-20 w-full text-white">
        <div className="w-32 ml-4 md:ml-8">
          <img src={gray.src} alt="gray-logo" className="w-full" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="px-4 py-2 hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="px-4 py-2 hover:text-gray-300 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <DesktopDropdown title="Our Solution" items={subpage2} />
            </li>
            <li>
              <Link href="/resources" className="px-4 py-2 hover:text-gray-300 transition-colors">
                Resources
              </Link>
            </li>
            <li>
              <DesktopDropdown title="Get Involved" items={subpage1} />
            </li>
            <li>
              <Link href="/contact" className="px-4 py-2 hover:text-gray-300 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 mr-8">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary" className="bg-white text-[#b062b0] hover:bg-gray-100">
              Sign Up
            </Button>
          </Link>
          <Link href="/subscription">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              Subscribe
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-2xl mr-4 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-[#b062b0] text-white z-50">
          <div className="p-4 border-t border-white/20">
            <ul className="space-y-4">
              <li><Link href="/" className="block py-2">Home</Link></li>
              <li><Link href="/about" className="block py-2">About Us</Link></li>
              <li>
                <button 
                  className="w-full text-left py-2"
                  onClick={() => toggleDropdown('solutions')}
                >
                  Our Solution ▾
                </button>
                {openDropdown === 'solutions' && (
                  <div className="ml-4 bg-white/10 rounded-lg p-2">
                    {subpage2.map((item) => {
                      const itemPath = item.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Link
                          key={item}
                          href={`/our-solution/${itemPath}`}
                          className="block py-2 hover:bg-white/20 rounded px-2"
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
              <li><Link href="/resources" className="block py-2">Resources</Link></li>
              <li>
                <button 
                  className="w-full text-left py-2"
                  onClick={() => toggleDropdown('involved')}
                >
                  Get Involved ▾
                </button>
                {openDropdown === 'involved' && (
                  <div className="ml-4 bg-white/10 rounded-lg p-2">
                    {subpage1.map((item) => {
                      const itemPath = item.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Link
                          key={item}
                          href={`/get-involved/${itemPath}`}
                          className="block py-2 hover:bg-white/20 rounded px-2"
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
              <li><Link href="/contact" className="block py-2">Contact</Link></li>
              <li className="pt-4 space-y-2">
                <Link 
                  href="/login" 
                  className="block text-center py-3 bg-white/20 rounded hover:bg-white/30"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block text-center py-3 bg-white text-[#b062b0] rounded hover:bg-gray-100"
                >
                  Sign Up
                </Link>
                <Link 
                  href="/subscription" 
                  className="block text-center py-3 bg-purple-700 rounded hover:bg-purple-800"
                >
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;