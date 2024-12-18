'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { WaitlistButton } from '@/components/WaitlistButton'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Fonctionnalités', href: '/fonctionnalites' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'À propos', href: '/a-propos' },
]

interface NavbarProps {
  showAnnouncement: boolean
}

export function Navbar({ showAnnouncement }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
  }, [mobileMenuOpen])

  return (
    <header 
      className={`fixed left-0 right-0 z-40 transition-all duration-200 ${
        showAnnouncement ? 'top-8' : 'top-0'
      }`}
    >
      {/* Background overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-200"
        style={{ 
          backgroundColor: 'white',
          opacity: isScrolled || !isHome ? 0.95 : 0,
          boxShadow: isScrolled ? '0 1px 3px 0 rgb(0 0 0 / 0.1)' : 'none'
        }}
      />

      <nav className="container mx-auto py-4 relative">
        <div className="flex items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <div className="flex flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <Image
                src="/images/logo/logo_blue.svg"
                alt="Dukka"
                width={160}
                height={64}
                className="h-10 w-auto sm:h-12 lg:h-14"
                priority
              />
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-dukka-primary'
                    : 'text-black hover:text-dukka-primary'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <WaitlistButton />
          </div>

          {/* Menu mobile button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu principal"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div 
        className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white transition-transform duration-300 ease-out z-[70] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <a href="/" className="-m-1.5 p-1.5">
            <Image
              src="/images/logo/logo_blue.svg"
              alt="Dukka"
              width={120}
              height={48}
              className="h-8 w-auto"
              priority
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-900"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-dukka-primary/10 text-dukka-primary'
                    : 'text-gray-900 hover:bg-gray-50 hover:text-dukka-primary'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-8">
            <WaitlistButton className="w-full justify-center" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar