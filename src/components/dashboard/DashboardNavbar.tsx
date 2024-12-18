// components/dashboard/DashboardNavbar.tsx
'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Users, ShoppingBag, MessageCircle,
  Settings, Truck, Globe, Package, Store, Menu, X,
  LogOut
} from 'lucide-react';

export default function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: 'PRINCIPAL',
      items: [
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Tableau de bord', href: '/dashboard', active: true },
        { icon: <ShoppingBag className="w-5 h-5" />, label: 'Commandes', href: '/dashboard/orders' },
        { icon: <MessageCircle className="w-5 h-5" />, label: 'Conversations', href: '/dashboard/conversations', notifications: 13 },
        { icon: <Package className="w-5 h-5" />, label: 'Catalogue', href: '/dashboard/catalogue' },
        { icon: <Users className="w-5 h-5" />, label: 'Clients', href: '/dashboard/clients' },
        { icon: <Truck className="w-5 h-5" />, label: 'Livraison', href: '/dashboard/shipping' },
        { icon: <Globe className="w-5 h-5" />, label: 'Performance', href: '/dashboard/performance' },
      ]
    },
    {
      title: 'PARAMÈTRES',
      items: [
        { icon: <Store className="w-5 h-5" />, label: 'Ma Boutique', href: '/dashboard/store' },
        { icon: <Settings className="w-5 h-5" />, label: 'Paramètres', href: '/dashboard/settings' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 overflow-y-auto z-40
              w-64 flex flex-col justify-between
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 transition-transform duration-200`}
      >
        <div>
          <div className="p-4 border-b">
            <Link href="/">
              <img src="/images/logo/logo_black.svg" alt="Dukka" className="h-10" />
            </Link>
          </div>
          
          <nav className="p-4">
            {menuItems.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-xs font-semibold text-gray-400 mb-4">{section.title}</h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <Link 
                      key={itemIdx}
                      href={item.href}
                      className={`block w-full flex items-center justify-between px-3 py-2 rounded-lg ${
                        item.active 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.notifications && (
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                          {item.notifications}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bouton de déconnexion */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}