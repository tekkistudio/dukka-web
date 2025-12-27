// src/app/(marketing)/layout.tsx
import NewHeader from '@/components/layout/NewHeader';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/sections/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <NewHeader />

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}