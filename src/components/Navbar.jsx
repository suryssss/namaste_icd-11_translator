"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { name: 'How it Works', href: '/howitworks' },
  { name: "What's included", href: '/included' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className=" px-10 py-4 flex items-center justify-between"
    >

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="text-[32px] font-medium text-[#C17858]"
      >
        AyurSetu
      </motion.div>

      <div className="flex items-center space-x-8">
        {navItems.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * (i + 1) }}
          >
            <Link
              href={item.href}
              className="text-gray-800 hover:text-[#C17858] transition text-[15px]"
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#C17858] text-white px-4 py-2 rounded-xl transition"
        >
          Get Started
        </motion.button>
      </div>
      
    </motion.nav>
  );
};

export default Navbar;
