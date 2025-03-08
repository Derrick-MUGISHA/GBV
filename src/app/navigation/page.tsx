"use client";
import React, { useState, useEffect } from "react";
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
import Image from "next/image";
import { LoginForm } from "@/components/ui/login-form";
import { SignUpForm } from "@/components/ui/SignIn-form";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

interface DesktopDropdownProps {
  title: string;
  items: string[];
  onLinkClick: (e: React.MouseEvent) => boolean;
}

const subpage1 = ["Volunteer", "Donate", "Partnership"];
const subpage2 = ["How it works", "Get Started", "Help"];

function DesktopDropdown({ title, items, onLinkClick }: DesktopDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const parentPath = title.toLowerCase().replace(/\s+/g, "-");

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
        >
          {items.map((item) => {
            const itemPath = item.toLowerCase().replace(/\s+/g, "-");
            return (
              <DropdownMenuItem
                key={item}
                className="hover:bg-gray-100 px-4 py-2.5 cursor-pointer"
              >
                <Link
                  href={`/${parentPath}/${itemPath}`}
                  className="w-full"
                  onClick={onLinkClick}
                >
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

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");
  const [isAuthenticated, setIsAuthenticated] = useState(user || userSession);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = sessionStorage.getItem("user");
      setIsAuthenticated(user || userSession);
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.removeItem("user");
    router.push("Wc");
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleNavigation = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsLoginModalOpen(true);
      return false;
    }
    return true;
  };

  return (
    <div className="relative">
      <header className="bg-[#b062b0d7] flex justify-between items-center px-4 h-20 w-full text-white">
        <div className="w-32 ml-4 md:ml-8">
          <Image
            src={gray.src}
            alt="gray-logo"
            className="w-full"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="dashboard"
                className="px-4 py-2 hover:text-gray-300 transition-colors"
                onClick={handleNavigation}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="px-4 py-2 hover:text-gray-300 transition-colors"
                onClick={handleNavigation}
              >
                About Us
              </Link>
            </li>
            <li>
              <DesktopDropdown
                title="Our Solution"
                items={subpage2}
                onLinkClick={handleNavigation}
              />
            </li>
            <li>
              <Link
                href="/resources"
                className="px-4 py-2 hover:text-gray-300 transition-colors"
                onClick={handleNavigation}
              >
                Resources
              </Link>
            </li>
            <li>
              <DesktopDropdown
                title="Get Involved"
                items={subpage1}
                onLinkClick={handleNavigation}
              />
            </li>
            <li>
              <Link
                href="/contact"
                className="px-4 py-2 hover:text-gray-300 transition-colors"
                onClick={handleNavigation}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 mr-8">
          {!isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </Button>
              <Button
                onClick={() => setIsRegisterModalOpen(true)}
                variant="secondary"
                className="bg-white text-[#b062b0] hover:bg-gray-100"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              Logout
            </Button>
          )}
          <Link 
          href="/community/web-dev" onClick={handleNavigation}>
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
            Community
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl mr-4 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-[100] flex items-center justify-center"
          onClick={() => setIsLoginModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="p-8 bg-white rounded-lg relative w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="bg-pink-500 absolute top-4 right-4 text-white p-2 rounded-full focus:outline-none"
              onClick={() => setIsLoginModalOpen(false)}
              aria-label="Close login modal"
            >
              <FiX size={24} />
            </Button>
            <LoginForm />
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-[100] flex items-center justify-center"
          onClick={() => setIsRegisterModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="p-8 bg-white rounded-lg relative w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="bg-pink-500 absolute top-4 right-4 text-white p-2 rounded-full focus:outline-none"
              onClick={() => setIsRegisterModalOpen(false)}
              aria-label="Close registration modal"
            >
              <FiX size={24} />
            </Button>
            <SignUpForm />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-[#b062b0] text-white z-50">
          <div className="p-4 border-t border-white/20">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="block py-2"
                  onClick={(e) => {
                    const allowed = handleNavigation(e);
                    if (allowed) setIsMobileMenuOpen(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2"
                  onClick={(e) => {
                    const allowed = handleNavigation(e);
                    if (allowed) setIsMobileMenuOpen(false);
                  }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Button
                  className="w-full text-left py-2"
                  onClick={() => toggleDropdown("solutions")}
                  aria-expanded={openDropdown === "solutions"}
                >
                  Our Solution ▾
                </Button>
                {openDropdown === "solutions" && (
                  <div className="ml-4 bg-white/10 rounded-lg p-2">
                    {subpage2.map((item) => {
                      const itemPath = item.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <Link
                          key={item}
                          href={`/our-solution/${itemPath}`}
                          className="block py-2 hover:bg-white/20 rounded px-2"
                          onClick={(e) => {
                            const allowed = handleNavigation(e);
                            if (allowed) setIsMobileMenuOpen(false);
                          }}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/resources"
                  className="block py-2"
                  onClick={(e) => {
                    const allowed = handleNavigation(e);
                    if (allowed) setIsMobileMenuOpen(false);
                  }}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Button
                  className="w-full text-left py-2"
                  onClick={() => toggleDropdown("involved")}
                  aria-expanded={openDropdown === "involved"}
                >
                  Get Involved ▾
                </Button>
                {openDropdown === "involved" && (
                  <div className="ml-4 bg-white/10 rounded-lg p-2">
                    {subpage1.map((item) => {
                      const itemPath = item.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <Link
                          key={item}
                          href={`/get-involved/${itemPath}`}
                          className="block py-2 hover:bg-white/20 rounded px-2"
                          onClick={(e) => {
                            const allowed = handleNavigation(e);
                            if (allowed) setIsMobileMenuOpen(false);
                          }}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2"
                  onClick={(e) => {
                    const allowed = handleNavigation(e);
                    if (allowed) setIsMobileMenuOpen(false);
                  }}
                >
                  Contact
                </Link>
              </li>
              <li className="pt-4 space-y-2">
                {!isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full text-white hover:bg-white/20"
                      variant="ghost"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsRegisterModalOpen(true);
                      }}
                      className="w-full bg-white text-[#b062b0] rounded hover:bg-gray-100"
                      variant="ghost"
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-white hover:bg-white/20"
                    variant="ghost"
                  >
                    Logout
                  </Button>
                )}
                <Link
                  href="/subscription"
                  className="block text-center py-3 bg-purple-700 rounded hover:bg-purple-800"
                  onClick={(e) => {
                    const allowed = handleNavigation(e);
                    if (allowed) setIsMobileMenuOpen(false);
                  }}
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

export default Navigation;