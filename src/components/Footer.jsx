import React from 'react'

const columns = [
  {
    items: ['How it Works', "What's included", 'About', 'FAQ']
  },
  {
    items: ['Testimonials', 'ICD-11', 'Help', 'Contact us']
  }
]

const Footer = () => {
  return (
    <footer className="bg-[#3b3d42] text-gray-200">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          <div className="text-white text-2xl font-semibold">AyurSetu</div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {columns.map((col, idx) => (
              <ul key={idx} className="space-y-3 text-sm">
                {col.items.map((item) => (
                  <li key={item}>
                    <a className="hover:text-white transition-colors cursor-pointer">{item}</a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-white/40" />
      </div>
    </footer>
  )
}

export default Footer