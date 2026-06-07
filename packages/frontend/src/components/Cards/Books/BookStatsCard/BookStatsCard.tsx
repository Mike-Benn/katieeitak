import { Separator } from '@base-ui/react';

export function BookStatsCard() {
  return (
    <div className="flex flex-row justify-between bg-white shadow-md rounded-md pt-4 pb-4">
      <div className="flex flex-col items-center justify-center flex-1">
        <span>1000</span>
        <span className="text-sm">Books read</span>
      </div>
      <Separator orientation="vertical" className="w-px bg-lightgray" />
      <div className="flex flex-col items-center justify-center flex-1">
        <span>580k</span>
        <span className="text-sm">Pages read</span>
      </div>
      <Separator orientation="vertical" className="w-px bg-lightgray" />

      <div className="flex flex-col items-center justify-center flex-1">
        <span>16.3m</span>
        <span className="text-sm">Words read</span>
      </div>
    </div>
  );
}
