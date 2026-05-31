import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}
export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return <div className={`page-wrapper flex flex-col ${className}`}>{children}</div>;
}
