'use client'

import React, { useState } from 'react';
import { 
 BarChart3, Users, ShoppingBag, MessageCircle, Send, 
 Settings, Truck, Globe, Package, Store, Menu, X,
 ChevronDown,
 Bell,
 LogOut
} from 'lucide-react';

const DashboardPage = () => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const menuItems = [
   {
     title: 'PRINCIPAL',
     items: [
       { icon: <BarChart3 className="w-5 h-5" />, label: 'Tableau de bord', active: true },
       { icon: <ShoppingBag className="w-5 h-5" />, label: 'Commandes' },
       { icon: <MessageCircle className="w-5 h-5" />, label: 'Conversations', notifications: 13 },
       { icon: <Package className="w-5 h-5" />, label: 'Catalogue' },
       { icon: <Users className="w-5 h-5" />, label: 'Clients' },
       { icon: <Truck className="w-5 h-5" />, label: 'Livraison' },
       { icon: <Globe className="w-5 h-5" />, label: 'Performance' },
     ]
   },
   {
     title: 'PARAMÈTRES',
     items: [
       { icon: <Store className="w-5 h-5" />, label: 'Ma Boutique' },
       { icon: <Settings className="w-5 h-5" />, label: 'Paramètres' }
     ]
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50 flex">
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
       <div className="p-4 border-b">
       <a href="/">
         <img src="/images/logo/logo_black.svg" alt="Dukka" className="h-10" />
       </a>
       </div>
       
       <nav className="p-4">
         {menuItems.map((section, idx) => (
           <div key={idx} className="mb-8">
             <h3 className="text-xs font-semibold text-gray-400 mb-4">{section.title}</h3>
             <div className="space-y-1">
               {section.items.map((item, itemIdx) => (
                 <button 
                   key={itemIdx}
                   className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${
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
                 </button>
               ))}
             </div>
           </div>
         ))}
       </nav>

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

     {/* Main Content */}
     <main className={`w-full transition-all duration-200
       md:ml-64 p-4 md:p-8 ${isSidebarOpen ? 'blur-sm' : ''} md:blur-none`}>
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
            <h1 className="text-2xl font-bold">Bonjour Mouhamadou 👋</h1>
            <p className="text-gray-600">Voici un aperçu de votre business aujourd'hui</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-600">Dernière mise à jour : il y a 5 minutes</span>
    
    {/* Sélecteur de boutique */}
    <div className="relative">
      <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50">
        <Store className="w-4 h-4" />
        <span>SAPATOU</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>

    {/* Notifications */}
    <button className="relative p-2 hover:bg-gray-100 rounded-lg">
      <Bell className="w-5 h-5" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  </div>
</div>

       {/* Stats */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="text-gray-600">Ventes du jour</div>
             <div className="text-green-500 text-sm">+12.5%</div>
           </div>
           <div className="text-3xl font-bold">407,000 FCFA</div>
           <div className="text-sm text-gray-500 mt-1">9 commandes</div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="text-gray-600">Conversations actives</div>
             <div className="text-green-500 text-sm">+5</div>
           </div>
           <div className="text-3xl font-bold">8</div>
           <div className="text-sm text-gray-500 mt-1">3 prêts à commander</div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="text-gray-600">Taux de conversion</div>
             <div className="text-green-500 text-sm">+2.3%</div>
           </div>
           <div className="text-3xl font-bold">45%</div>
           <div className="text-sm text-gray-500 mt-1">Moyenne du mois: 37%</div>
         </div>
       </div>

       {/* Assistant AI Chat */}
       <div className="bg-white rounded-xl shadow-sm">
         <div className="border-b px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
             <img src="/images/logo/fav.svg" alt="Dukka" className="h-7" />
             </div>
             <div>
               <h2 className="font-semibold">Assistant Dukka</h2>
               <p className="text-sm text-gray-500">Toujours là pour vous aider</p>
             </div>
           </div>
           <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">En ligne</span>
         </div>

         <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-[#F0F2F5]">
           {/* Assistant Message */}
           <div className="flex gap-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img src="/images/logo/fav.svg" alt="Dukka" className="h-7" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Assistant Dukka</span>
                    </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-900">
                   Bonjour Mouhamadou ! J'ai analysé les performances de votre boutique aujourd'hui :
                   <ul className="mt-2 space-y-1">
                     <li>• Vos mocassins tressés se vendent très bien (+45% ce mois)</li>
                     <li>• 3 clients attendent une réponse sur WhatsApp</li>
                     <li>• Le stock des pointures 42 et 43 est presque épuisé</li>
                   </ul>
                   Que souhaitez-vous que je vous explique en détail ?
                 </div>
                 <div className="text-xs text-gray-500 mt-2">09:15</div>
               </div>
             </div>
           </div>

           {/* User Message */}
           <div className="flex gap-4 justify-end">
  <div className="flex-1 max-w-lg">
    <div className="flex flex-col items-end">
      <div className="text-sm text-gray-600 mb-1">Vous</div>
      <div className="bg-blue-600 text-white p-4 rounded-lg">
        <div className="text-sm">
          Parle-moi des clients qui attendent une réponse sur WhatsApp
        </div>
        <div className="text-xs text-blue-200 mt-2">09:16</div>
      </div>
    </div>
  </div>
</div>

           {/* Assistant Response */}
           <div className="flex gap-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img src="/images/logo/fav.svg" alt="Dukka" className="h-7" />
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Assistant Dukka</span>
                </div>
               <div className="bg-gray-50 p-4 rounded-lg">
                 <div className="text-sm text-gray-900">
                   Voici le détail des 3 clients :
                   <ul className="mt-2 space-y-1">
                     <li>• Salif Diop : intéressé par les mocassins tressés pointure 43 (stock épuisé)</li>
                     <li>• Amina Sarr : question sur le délai de fabrication des mocassins</li>
                     <li>• Malick Ndiaye : demande des photos supplémentaires</li>
                   </ul>
                   Je peux répondre automatiquement ou vous préférez le faire ?
                 </div>
                 <div className="text-xs text-gray-500 mt-2">09:17</div>
               </div>
             </div>
           </div>
         </div>

         {/* Chat Input */}
         <div className="border-t p-4">
           <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-2">
             <input 
               type="text"
               placeholder="Posez une question à votre assistant..."
               className="flex-1 bg-transparent px-2 focus:outline-none"
             />
             <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
               <Send className="w-5 h-5" />
             </button>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default DashboardPage;