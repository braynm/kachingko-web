import { jsx, jsxs } from 'react/jsx-runtime';
import { Outlet, useMatchRoute, Link } from '@tanstack/react-router';
import { S as Sidebar, a as SidebarHeader, b as SidebarContent, d as SidebarGroup, e as SidebarGroupLabel, f as SidebarGroupContent, g as SidebarMenu, h as SidebarMenuItem, i as SidebarMenuButton, j as SidebarRail, k as SidebarFooter, c as cn } from './ssr.mjs';
import { ChartSpline, CreditCard, Settings2, User2, ChevronUp } from 'lucide-react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { T as ThemeSwitcher } from './index-Bx4ItRZi.mjs';
import '@tanstack/react-query';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '../nitro/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-dialog';
import '@radix-ui/react-tooltip';
import 'zod';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Applicative';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/internal';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Chain';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Compactable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/ChainRec';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromEither';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Functor';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Separated';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Witherable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/EitherT';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Filterable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromIO';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromTask';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';
import '@radix-ui/react-toggle';

function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const menuItems = [
  { path: "/spending-highlights", label: "Spending Highlights", icon: ChartSpline },
  { path: "/txns", label: "Transactions", icon: CreditCard },
  { path: "/", label: "Settings", icon: Settings2 }
];
function AppSidebar() {
  const matchRoute = useMatchRoute();
  return /* @__PURE__ */ jsxs(Sidebar, { children: [
    /* @__PURE__ */ jsx(SidebarHeader, {}),
    /* @__PURE__ */ jsx(SidebarContent, { children: /* @__PURE__ */ jsxs(SidebarGroup, { children: [
      /* @__PURE__ */ jsxs(SidebarGroupLabel, { className: "mb-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-extrabold", children: "KACHINGKO" }),
        /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx(ThemeSwitcher, {}) })
      ] }),
      /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: menuItems.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, isActive: !!matchRoute({ to: item.path, fuzzy: true }), children: /* @__PURE__ */ jsxs("a", { href: item.path, children: [
        /* @__PURE__ */ jsx(item.icon, {}),
        /* @__PURE__ */ jsx("span", { children: item.label })
      ] }) }) }, item.label)) }) })
    ] }) }),
    /* @__PURE__ */ jsx(SidebarRail, {}),
    /* @__PURE__ */ jsx(SidebarFooter, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(SidebarMenuButton, { children: [
        /* @__PURE__ */ jsx(User2, {}),
        " Bryan",
        /* @__PURE__ */ jsx(ChevronUp, { className: "ml-auto" })
      ] }) }),
      /* @__PURE__ */ jsxs(
        DropdownMenuContent,
        {
          side: "top",
          className: "w-[--radix-popper-anchor-width]",
          children: [
            /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx("span", { children: "Account" }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx(Link, { className: "w-full", to: "/logout", children: "Sign out" }) })
          ]
        }
      )
    ] }) }) }) })
  ] });
}
function AuthenticatedLayout() {
  return /* @__PURE__ */ jsxs("div", { className: "authenticated-layout flex my-[5rem] mx-auto", children: [
    /* @__PURE__ */ jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxs("main", { className: "main-content", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      " "
    ] })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx(AuthenticatedLayout, {});
}

export { RouteComponent as component };
//# sourceMappingURL=_authenticated-33ktARjl.mjs.map
