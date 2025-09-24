"use client"
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cormorant_SC } from 'next/font/google'

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['400','700'],
  display: 'swap'
})

const faqs = [
  {
    q: 'What does AyurSetu do?',
    a: 'AyurSetu is a FHIR-based translation engine that converts Ayush (NAMASTE) codes into WHO ICD-11 codes in real-time, enabling seamless integration of traditional medicine data into modern EMR systems.'
  },
  { q: 'Who can use AyurSetu?', a: 'AyurSetu is designed for healthcare providers, hospitals, and EMR developers who want to integrate Ayush codes with ICD-11 standards in their systems.' },
  { q: 'Is AyurSetu secure and reliable?', a: 'Yes. AyurSetu uses secure data transfer standards and FHIR protocols to ensure accurate and reliable translation of medical codes while protecting sensitive health information.' },
  { q: 'Is there support if I face issues with AyurSetu?', a: 'Yes. Users can access documentation and reach out to our support team for troubleshooting, guidance, and technical assistance.' }
]

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = useCallback((idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx))
  }, [])

  return (
    <section className="w-full max-w-5xl mx-auto py-14 px-5">
      <h2 className={`${cormorantSC.className} text-[44px] sm:text-[52px] text-center mb-8`}>
        <span className="text-gray-600">Common</span>{' '}
        <span className="text-[#C17858]">Questions</span>
      </h2>

      <div className="divide-y divide-[#E7D8CD] border-t border-b border-[#E7D8CD]">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx
          return (
            <div key={idx} className="">
              <div
                onClick={() => toggle(idx)}
                role="button"
                aria-expanded={isOpen}
                className="w-full py-5 flex items-baseline gap-6 cursor-pointer"
              >
                {/* Question - Fixed width similar to your design */}
                <div className="min-w-[230px] max-w-[230px]">
                  <span className="text-sm text-gray-800">{item.q}</span>
                </div>

                {/* Answer - Flexible width, aligned with question baseline */}
                 <div className="flex-1 min-w-0">
                  <AnimatePresence initial={false}>
                    {isOpen && item.a && (
                      <motion.div
                        key="inline-content"
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-gray-700 leading-relaxed"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                 {/* Toggle icon */}
                 <motion.span
                   initial={false}
                   animate={{ rotate: isOpen ? 45 : 0 }}
                   transition={{ duration: 0.15 }}
                   className="text-[#C17858] text-xl leading-none min-w-[24px] text-right"
                 >
                   {isOpen ? '×' : '+'}
                 </motion.span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center mt-10">
        <button className="rounded-full border border-[#E7D8CD] text-[#C17858] px-6 py-2 text-sm hover:bg-[#fff6f2]">
          View all FAQ's
        </button>
      </div>
    </section>
  )
}

export default Faq