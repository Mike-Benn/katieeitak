interface SubmitButtonProps {
  isSubmitting: boolean;
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button
      className="inline-block border border-muted-border bg-muted-input rounded-md font-semibold pt-2 pb-2 pl-3 pr-3 disabled:opacity-40"
      type="submit"
      disabled={isSubmitting}
    >
      <span>Submit</span>
    </button>
  );
}
