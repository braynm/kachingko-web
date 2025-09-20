import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/app/components/ui/sidebar"

import {
  ChevronUp,
  User2,
  ChartSpline,
  CreditCard,
  Settings2
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/app/components/ui/dropdown-menu'
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher"
import { Link, useMatchRoute } from "@tanstack/react-router"

const menuItems = [
  { path: '/spending-highlights', label: 'Spending Highlights', icon: ChartSpline, },
  { path: '/txns', label: 'Transactions', icon: CreditCard, },
  { path: '/', label: 'Settings', icon: Settings2 },
]

export function AppSidebar() {
  const matchRoute = useMatchRoute()

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-5">
            <h2 className="font-extrabold">KACHINGKO</h2>
            <div className="ml-auto">
              <ThemeSwitcher />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={!!matchRoute({ to: item.path, fuzzy: true })}>
                    <a href={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Bryan
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                {/*<DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>*/}
                <DropdownMenuItem>
                  <Link className="w-full" to="/logout">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
