import SessionProvider from '@/components/admin/SessionProvider'
import AdminSidebar from '@/components/admin/Sidebar'
import CustomCursor from '@/components/ui/CustomCursor'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CustomCursor />
      <div className="flex min-h-screen bg-[#08080F] font-sans">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  )
}
