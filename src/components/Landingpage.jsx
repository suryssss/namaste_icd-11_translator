"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Cormorant_SC } from 'next/font/google';
const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['400','700'],
    display: 'swap'
  });
  import Image from 'next/image'; 

const Landingpage = () => {
  return (
    <motion.div
      className='w-full text-center pt-21'
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } }
      }}
    >
      <motion.h1
        variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}
        className={`${cormorantSC.className} text-[54px] mb-0`}
      >
        The Digital Rosetta Stone for
      </motion.h1>
      <motion.h1
        variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}
        className={`${cormorantSC.className} text-[48px] text-[#C17858] `}
      >
        Indian Healthcare
      </motion.h1>
      <motion.p
        variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}
        className='text-gray-500 pt-6'
      >
        A smart engine translating Ayush codes <br></br>to ICD-11 globally
      </motion.p>
      <motion.div
        variants={{ hidden: { scale: 0.98, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
        className="mt-8"
      >
        <Image
          src="/image1.png"
          alt="Landing Page Illustration"
          width={900}  
          height={400}
          className="mx-auto"
        />
      </motion.div>
    </motion.div>
  )
}

export default Landingpage