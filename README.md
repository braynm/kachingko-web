# Kachingko Web

Modern web frontend for Kachingko - A comprehensive financial dashboard for transaction analysis, budgeting, and spending insights from your credit card statements.

## Features

- **Interactive Dashboard** — Real-time spending analytics with beautiful charts and visualizations
- **Transaction Management** — View, categorize, and search through all your financial transactions
- **Budget Tracking** — Set spending limits and monitor progress across categories
- **Statement Upload** — Drag-and-drop PDF statements with instant processing feedback
- **Responsive Design** — Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Mode** — Modern UI with theme switching capabilities

## Supported Banks

- [x] RCBC
- [x] EastWest
- [ ] BPI
- [ ] BDO
- [ ] Metrobank

## Tech Stack

- [TypeScript](https://typescriptlang.org) — Type-safe JavaScript
- [React 19](https://react.dev) — UI library
- [TanStack Start](https://tanstack.com/start) — Full-stack React framework
- [TanStack Router](https://tanstack.com/router) — Type-safe routing
- [TanStack Query](https://tanstack.com/query) — Data fetching and caching
- [TanStack Form](https://tanstack.com/form) — Type-safe forms
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) — Beautifully designed components
- [Radix UI](https://radix-ui.com) — Unstyled, accessible UI primitives
- [Vite](https://vitejs.dev) — Next generation frontend tooling
- [Zod](https://zod.dev) — TypeScript-first schema validation

## Quick Start

### Prerequisites

- Node.js 22.17+
- npm, yarn, or pnpm
- [Kachingko API](https://github.com/braynm/kachingko-api) running locally

### Installing Node.js with nvm

We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage Node.js versions for consistency across environments.

**Install nvm:**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload your shell profile
source ~/.bashrc
# or for zsh users:
source ~/.zshrc

# Verify installation
nvm --version
```

**Install Node.js:**

```bash
# Install Node.js LTS
nvm install 22.17.0
nvm use 22.17.0
nvm alias default 22.17.0

# Verify installation
node --version
npm --version
```

### Environment Variables

Create `.env.local`:

```bash
# API Configuration

API_URL=http://localhost:8888

# Generate session secret via node
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

SESSION_PASSWORD=
```

### Installation

```bash
# Clone repository
git clone https://github.com/braynm/kachingko-web.git
cd kachingko-web

# Install dependencies
npm install

# Start development server
npm run dev
```

Application will be available at http://localhost:3333

## Available Scripts

```bash
npm run dev          # Start development server
```

## Project Structure

```
.
── app
│   ├── components
│   │   ├── AppSidebar.tsx
│   │   ├── EmptyData.tsx
│   │   ├── ThemeSwitcher
│   │   ├── layout
│   │   └── ui
│   ├── pages
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── SpendingHighlightsPage
│   │   ├── TxnPage
│   │   └── TxnUploadPage
│   ├── routeTree.gen.ts
│   ├── routes
│   │   ├── __root.tsx
│   │   ├── _authenticated
│   │   ├── _authenticated.tsx
│   │   ├── _unathenticated
│   │   ├── _unathenticated.tsx
│   │   └── index.tsx
│   ├── server
│   │   └── session.ts
│   └── styles
│       └── app.css
├── hooks
│   ├── use-mobile.ts
│   └── user-transaction.ts
├── lib
│   ├── auth
│   │   └── index.ts
│   ├── hooks
│   │   └── query.ts
│   ├── session
│   │   └── index.ts
│   └── utils
│       ├── amount.ts
│       ├── api.ts
│       ├── cn.ts
│       └── date.ts
└── router.tsx
```

## Development

### Adding New Components

```bash
# Add shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog

# Components will be added to app/components/ui/
```

### API Integration

The app combination of TanStack Query + TanStack Server functions for data fetching. API services are located in `routes/<page name>`:

```typescript
// Example: app/services/transactions.ts
import { useQuery } from '@tanstack/react-query'

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetch('/api/transactions').then(res => res.json()),
  })
}
```

### Routing

TanStack Router provides file-based routing with type safety:

```typescript
// app/routes/transactions/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transactions/')({
  component: TransactionsPage,
})

function TransactionsPage() {
  return <div>Transactions Dashboard</div>
}
```

### Styling with Tailwind

The project uses Tailwind CSS with a custom design system:

```tsx
// Example component with Tailwind classes
export function DashboardCard({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### Form Handling

Forms use TanStack Form with Zod validation:

```typescript
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'

const budgetSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number().positive('Amount must be positive'),
})

export function BudgetForm() {
  const form = useForm({
    defaultValues: {
      category: '',
      amount: 0,
    },
    validatorAdapter: zodValidator,
  })
  
  // Form implementation...
}
```

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# Start production server
npm run start
```

### Build Output

The build creates `.output/` directory that can be deployed to any hosting service:

- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Contributing

Contributions are welcome! Please read our [contributing guide](https://github.com/braynm/kachingko-docs/blob/main/CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Related Repositories

- **API**: [kachingko-api](https://github.com/braynm/kachingko-api) - Backend Elixir/Phoenix API
- **Docs**: [kachingko-docs](https://github.com/braynm/kachingko-docs) - Documentation

## License

This project is licensed under the Apache 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [kachingko-docs](https://github.com/braynm/kachingko-docs)
- **API Docs**: [kachingko-api](https://github.com/braynm/kachingko-api)
- **Discussions**: [GitHub Discussions](https://github.com/braynm/kachingko-web/discussions)
