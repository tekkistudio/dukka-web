// src/components/LoadingShell.tsx

export default function LoadingShell() {
    return (
      <div className="min-h-screen bg-white">
        {/* Header placeholder */}
        <div className="h-16 bg-gray-50 animate-pulse"></div>
        
        {/* Hero section placeholder */}
        <div className="min-h-[70vh] bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-dukka-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Features section placeholder */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="h-10 bg-gray-200 animate-pulse max-w-md mx-auto mb-8 rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse max-w-xl mx-auto mb-12 rounded"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Demo section placeholder */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="h-10 bg-gray-200 animate-pulse max-w-md mx-auto mb-8 rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse max-w-xl mx-auto mb-12 rounded"></div>
            
            <div className="h-[500px] bg-gray-100 animate-pulse rounded-lg max-w-4xl mx-auto"></div>
          </div>
        </div>
        
        {/* Footer placeholder */}
        <div className="h-64 bg-gray-800 animate-pulse"></div>
      </div>
    );
  }