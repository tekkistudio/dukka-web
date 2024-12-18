// components/dashboard/DashboardFooter.tsx

export default function DashboardFooter() {
    return (
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 Dukka. Tous droits réservés.
            </div>
            <div className="mt-2 md:mt-0 flex space-x-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Centre d'aide
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Documentation API
              </button>
            </div>
          </div>
        </div>
      </footer>
    )
  }