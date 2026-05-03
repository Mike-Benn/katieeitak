import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}
export function PageWrapper({ children }: PageWrapperProps) {
  return <div className="page-wrapper flex flex-col h-full">{children}</div>;
}
