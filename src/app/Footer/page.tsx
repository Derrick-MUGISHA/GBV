import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Get Help', href: '/help' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms and Conditions', href: '/terms' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/169AfFGyg2/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/elysemarie250?s=21', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/e_l_y_s_e003?igsh=Zzd6d2trZ2w3OGVi&utm_source=qr', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/marie-elyse-uyiringiye-150102321/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@ElyseUyiringiye', label: 'YouTube' },
    { icon: Github, href: 'https://github.com/elyse003', label: 'GitHub' }
  ];

  return (
    <footer 
      className="w-full py-8 px-4" 
      style={{ backgroundColor: '#b062b0d7' }}
    >
      <div className="container mx-auto">
        {/* Quote Section - At the top */}
        <div className="text-center mb-6">
          <blockquote className="text-white italic text-lg font-semibold">
            &ldquo;Your voice matters. Together, we can make a difference.&rdquo;
          </blockquote>
        </div>

        {/* Navigation Links with Separators */}
        <nav className="w-full mb-6">
          <ul className="flex flex-wrap justify-center items-center gap-4">
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                {link.href ? (
                  <li className="text-white hover:text-gray-200 transition-colors">
                    <Link href={link.href} className="text-sm">
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li className="text-white text-sm cursor-default">
                    {link.label}
                  </li>
                )}
                {/* Add separator, but not after the last item */}
                {index < footerLinks.length - 1 && (
                  <li className="text-white text-sm">|</li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Social Media Links - Now at the bottom */}
        <div className="flex justify-center space-x-6 mt-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a 
              key={label} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={label}
            >
              <Icon size={28} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-white text-sm mt-6">
          © {currentYear} All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;