# Dr. Mark Campbell — Brand Website Setup

## File placement in your Next.js 15 project

```
your-project/
├── app/
│   ├── layout.tsx      ← Copy layout.tsx here
│   ├── page.tsx        ← Copy page.tsx here
│   └── globals.css     ← Create this (see below)
├── public/
│   ├── og-image.jpg    ← Add 1200×630 OG image
│   └── favicon.ico
├── package.json
└── tailwind.config.ts
```

## Required packages

```bash
npm install framer-motion lucide-react
```

## globals.css (minimal)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
```

## tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

export default config;
```

## Replacing the portrait placeholder

In `page.tsx`, find the portrait section (search for `"Executive Portrait"`) and
replace the placeholder `<div>` with a Next.js `<Image>` component:

```tsx
import Image from "next/image";

// Replace placeholder div with:
<Image
  src="/dr-mark-campbell.jpg"
  alt="Dr. Mark Campbell, VP of Information Technology, Houston Rockets"
  fill
  sizes="(max-width: 768px) 100vw, 520px"
  className="object-cover object-top"
  priority
/>
```

Add your hi-res executive portrait to `public/dr-mark-campbell.jpg`.

## Buy Book links

Search for `Buy Book` buttons in `page.tsx` and update the `href` or `onClick`
handlers to point to your Amazon/publisher URLs.

## Deployment

The project is immediately deployable to **Vercel**, **Netlify**, or **AWS Amplify**
with zero configuration changes.

---

Built for Dr. Mark Campbell, PhD · markcampbellphd.com
