export function GradientTitle({ 
    children, 
    subtitle 
  }: { 
    children: React.ReactNode
    subtitle?: string 
  }) {
    return (
      <div className="text-center max-w-3xl mx-auto opacity-0 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-pink-500 text-transparent bg-clip-text">
          {children}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        )}
      </div>
    )
  }