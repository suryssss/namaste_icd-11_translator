'use client'
import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [codeType, setCodeType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState([]) // unified display rows: {line1, line2, line3}
  const [errorMsg, setErrorMsg] = useState('')
  const [lastInfo, setLastInfo] = useState(null) // { endpoint, count }

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault()
    if (!searchTerm.trim() || !codeType) return

    setErrorMsg('')
    setIsLoading(true)

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:5000'
      const looksLikeNamcId = /^namc/i.test(searchTerm.trim())
      const looksLikeIcdCode = /^[A-Za-z0-9][A-Za-z0-9.\-]*$/.test(searchTerm.trim()) && /\d/.test(searchTerm)

      let endpoint = ''
      if (codeType === 'icd' && looksLikeNamcId) {
        // User entered NAMC_ID and wants ICD → translate NAMC→ICD
        endpoint = `${base}/translate/namc/${encodeURIComponent(searchTerm.trim())}`
      } else if (codeType === 'namaste' && looksLikeIcdCode) {
        // User entered ICD code and wants NAMC → translate ICD→NAMC
        endpoint = `${base}/translate/icd/${encodeURIComponent(searchTerm.trim())}`
      } else if (looksLikeNamcId) {
        // Default: NAMC_ID given, fetch mappings
        endpoint = `${base}/translate/namc/${encodeURIComponent(searchTerm.trim())}`
      } else if (looksLikeIcdCode) {
        // Default: ICD code given, fetch mappings
        endpoint = `${base}/translate/icd/${encodeURIComponent(searchTerm.trim())}`
      } else {
        // Fallback to search by term
        endpoint = `${base}/search?term=${encodeURIComponent(searchTerm.trim())}&limit=3`
      }

      const response = await axios.get(endpoint)
      const data = response.data
      console.log('API response:', data)

      // Normalize results to array of display rows
      let next = []
      if (Array.isArray(data.mappings)) {
        // /translate/namc or /translate/icd → unified mappings
        next = data.mappings.map(m => ({
          line1: m.NAMC_term || '-',
          line2: m.ICD_Code ? `ICD: ${m.ICD_Code}` : '',
          line3: [m.ICD_Title || '', typeof m.Similarity === 'number' ? `Sim: ${m.Similarity.toFixed(4)}` : '']
            .filter(Boolean)
            .join('  •  '),
          meta: {
            NAMC_ID: m.NAMC_ID,
            NAMC_term: m.NAMC_term,
            ICD_Code: m.ICD_Code,
            ICD_Title: m.ICD_Title,
            Similarity: m.Similarity,
          }
        }))
      } else if (Array.isArray(data.results)) {
        // /search → mixed
        next = data.results.map(r => {
          const icdCode = r?.mapping?.ICD_Code ?? r?.ICD_Code ?? ''
          const icdTitle = r?.mapping?.ICD_Title ?? r?.ICD_Title ?? ''
          const namcTerm = r?.NAMC_term ?? ''
          const similarity = r?.mapping?.Similarity ?? r?.Similarity
          const namcId = r?.NAMC_ID
          return {
            line1: namcTerm || '-',
            line2: icdCode ? `ICD: ${icdCode}` : '',
            line3: [icdTitle || '', namcTerm && typeof similarity === 'number' ? `Sim: ${Number(similarity).toFixed(4)}` : '']
              .filter(Boolean)
              .join('  •  '),
            meta: {
              NAMC_ID: namcId,
              NAMC_term: namcTerm,
              ICD_Code: icdCode,
              ICD_Title: icdTitle,
              Similarity: typeof similarity === 'number' ? similarity : (similarity != null ? Number(similarity) : undefined),
            }
          }
        })
      }
      setRows(next)
      setLastInfo({ endpoint, count: next.length })
    } catch (error) {
      console.error('Search failed:', error)
      setErrorMsg(error?.response?.data?.error || error.message || 'Request failed')
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, codeType])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleSubmit()
  }, [handleSubmit])

  const clearSearch = useCallback(() => setSearchTerm(''), [])

  return (
    <div className="w-full flex justify-center py-10">
      <motion.div className="w-[920px] max-w-full">
        <motion.div className="rounded-[24px] border-[10px] border-[#C17858] bg-[#e8d8cf]/40 shadow-md">
          <div className="m-5 rounded-[24px] bg-white p-8 shadow-sm">
            <p className="text-[#C17858] text-sm font-semibold tracking-wide">HEALTHSYNC EMR SYSTEM</p>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter Namaste Code or Condition name"
                    className="h-10 w-[320px] max-w-full rounded-full border border-gray-300 px-4 text-sm outline-none focus:border-[#C17858]"
                    disabled={isLoading}
                  />
                  {searchTerm && <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">×</button>}
                </div>

                <select
                  value={codeType}
                  onChange={(e) => setCodeType(e.target.value)}
                  className="h-10 w-[230px] rounded-full border border-gray-300 bg-white px-4 text-sm outline-none focus:border-[#C17858]"
                  disabled={isLoading}
                >
                  <option value="" disabled>Select code type</option>
                  <option value="namaste">Namaste</option>
                  <option value="icd">ICD-11</option>
                  <option value="other">Other</option>
                </select>

                <button type="submit" disabled={!searchTerm.trim() || !codeType || isLoading} className="h-10 rounded-full bg-[#C17858] px-6 text-white text-sm">
                  {isLoading ? 'Searching...' : 'Submit'}
                </button>
              </div>
            </form>

            <div className="mt-7 rounded-2xl border border-[#E7D8CD] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">Results ({rows.length})</p>
              </div>
              {errorMsg && (
                <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
              )}
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {rows.map((r, index) => (
                  <motion.div key={index} whileHover={{ y: -4 }} className="rounded-2xl border border-[#E7D8CD] p-6 bg-white shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[#C17858] text-sm font-semibold break-words" title={r?.meta?.NAMC_term || r.line1}>
                          {r?.meta?.NAMC_term || r.line1}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-gray-600">
                          {r?.meta?.NAMC_ID && (
                            <span className="rounded-full border border-[#E7D8CD] px-2 py-0.5">NAMC_ID: {r.meta.NAMC_ID}</span>
                          )}
                          {r?.meta?.ICD_Code && (
                            <span className="rounded-full border border-[#E7D8CD] px-2 py-0.5">ICD_Code: {r.meta.ICD_Code}</span>
                          )}
                        </div>
                        {r?.meta?.ICD_Title && (
                          <div className="mt-3 text-xs text-gray-700 break-words" title={r.meta.ICD_Title}>
                            {r.meta.ICD_Title}
                          </div>
                        )}
                      </div>
                      {typeof r?.meta?.Similarity === 'number' && (
                        <div className="shrink-0 rounded-md bg-[#F5EFEA] px-2 py-1 text-[10px] text-gray-700">
                          Sim: {r.meta.Similarity.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {rows.length === 0 && !isLoading && !errorMsg && (
                  <p className="text-gray-500 text-sm mt-2">No results. Try a different term or code type.</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Input
