export default function LoadingLayout({ children }: { children?: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header placeholder */}
        <div className="h-16 bg-gray-50 animate-pulse"></div>
        
        {/* Contenu principal */}
        <main>
          {children || (
            <div className="min-h-[80vh] flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-dukka-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </main>
        
        {/* Footer placeholder */}
        <div className="h-16 bg-gray-50 animate-pulse"></div>
      </div>
    );
  }