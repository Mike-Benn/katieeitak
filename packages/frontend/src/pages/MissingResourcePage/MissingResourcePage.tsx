import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';
import type { AppRoutePath } from '@/routes/router';

interface MissingResourcePageProps {
  backTo?: AppRoutePath;
}

export function MissingResourcePage({ backTo }: MissingResourcePageProps) {
  return (
    <PageWrapper className="p-6">
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="flex flex-col justify-center items-center text-slate-700 font-bold gap-6">
          <img src="/cridr-transparent.png" alt="Website logo" className="h-48 w-auto" />
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-5xl">Oops</h1>
            <span>Something went wrong.</span>
          </div>
        </div>
      </div>
      <Link
        to={backTo ?? '/'}
        className="relative rounded-lg bg-mainbtn py-3 text-white px-4 w-full flex justify-center font-bold"
      >
        Go back
      </Link>
    </PageWrapper>
  );
}
