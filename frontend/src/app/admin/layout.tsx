// app/admin/layout.tsx
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
        {children}
    </div>
  );
}
