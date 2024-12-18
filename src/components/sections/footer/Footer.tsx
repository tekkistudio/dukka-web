'use client'

import { FooterContent } from './FooterContent'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <FooterContent />
      </div>
    </footer>
  )
}