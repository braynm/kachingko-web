import { Link, Outlet } from '@tanstack/react-router'
import { ThemeSwitcher } from '../ThemeSwitcher'

export function UnauthenticatedLayout() {
  return (
    <div className="unauthenticated-layout container mx-auto w-2xl flex flex-col min-h-screen ">
      {/* Top header */}
      <header className="header py-5">
        <div className="header-content flex justify-between items-center">
          <div className="logo font-extrabold ">KACHINGKO</div>
          <nav className="header-nav flex gap-4 items-center">
            <ThemeSwitcher />
            <Link
              activeProps={{
                className: 'hover:text-primary hover:font-medium active',
                style: { color: 'text-primary', fontWeight: 'bold' }
              }}
              to="/login">Login</Link>
            <Link
              activeProps={{
                className: 'hover:text-primary hover:font-medium active',
                style: { color: 'text-primary', fontWeight: 'bold' }
              }}
              to='/signup'>Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="main-content flex items-center min-h-[calc(100vh-10rem)]">
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  )
}

