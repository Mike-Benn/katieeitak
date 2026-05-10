import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';

export function AnxietyPage() {
  return (
    <PageWrapper className="p-6">
      <Link to="/anxiety/new">
        <span className="font-semibold text-xl border border-muted-border bg-muted-input p-2 rounded-md">
          New
        </span>
      </Link>
    </PageWrapper>
  );
}
