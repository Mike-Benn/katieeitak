import { useAppForm } from '@/hooks/useAppForm';
import { toast } from 'sonner';
import { Button, Dialog, Separator } from '@base-ui/react';
import { useState } from 'react';
import { X, CircleCheck, Trash2 } from 'lucide-react';
import type { DetailedBookResponse, GetMarkedBookResponse } from '@katieeitak/shared';
import { useMarkBookReadMutation } from '@/hooks/mutations/useMarkBookReadMutation';
import { usePatchReadBookByIdMutation } from '@/hooks/mutations/usePatchReadBookByIdMutation';
import { MarkBookReadFormSchema, PatchReadBookFormSchema } from '@katieeitak/shared';

interface SaveBookDialogProps {
  markedBookProfileData: GetMarkedBookResponse | null;
  bookProfileData: DetailedBookResponse;
}

export function SaveBookDialog({ markedBookProfileData, bookProfileData }: SaveBookDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: mutateMarkBookRead } = useMarkBookReadMutation();
  const { mutate: mutatePatchReadBook } = usePatchReadBookByIdMutation();
  const form = useAppForm({
    defaultValues: {
      pagesRead: markedBookProfileData?.page_count ? String(markedBookProfileData.page_count) : '',
      wordsRead: markedBookProfileData?.word_count ? String(markedBookProfileData.word_count) : '',
      rating: markedBookProfileData?.rating ?? undefined,
    },
    onSubmit: async ({ value: formValues, formApi }) => {
      const isDefaultValue = formApi.state.isDefaultValue;
      if (isDefaultValue) {
        setOpen(false);
        toast.success('Book status successfully updated!');
        return;
      }
      if (!markedBookProfileData) {
        const parsedFormValues = MarkBookReadFormSchema.safeParse(formValues);
        if (parsedFormValues.success) {
          mutateMarkBookRead(
            {
              ol_book_key: bookProfileData.book.key.split('/works/')[1],
              title: bookProfileData.book.title ?? null,
              ol_author_key:
                bookProfileData.book.authors?.[0]?.author?.key?.split('/authors/')[1] ?? null,
              author_name: bookProfileData.author_name ?? null,
              cover_i: bookProfileData.book.covers?.[0] ?? null,
              page_count: parsedFormValues.data.pagesRead,
              word_count: parsedFormValues.data.wordsRead,
              rating: parsedFormValues.data.rating,
            },
            {
              onSuccess: () => {
                setOpen(false);
                toast.success('Book marked as read!');
              },
            },
          );
        } else {
          toast.error('Something went wrong, please try again.');
        }
      } else {
        const defaultFormValues = formApi.options.defaultValues;
        if (!defaultFormValues) return;
        const changedFormValues: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(formValues)) {
          const typedKey = key as keyof typeof defaultFormValues;
          if (value !== defaultFormValues[typedKey]) {
            changedFormValues[typedKey] = value;
          }
        }
        const parsedChangedFormValues = PatchReadBookFormSchema.safeParse(changedFormValues);
        if (!parsedChangedFormValues.success) {
          toast.error('There was an error updating book status, please try again.');
          return;
        }

        mutatePatchReadBook(
          {
            id: markedBookProfileData.id,
            payload: {
              word_count: parsedChangedFormValues.data.wordsRead,
              page_count: parsedChangedFormValues.data.pagesRead,
              rating: parsedChangedFormValues.data.rating,
            },
          },
          {
            onSuccess: () => {
              setOpen(false);
              toast.success('Book status successfully updated!');
            },
          },
        );
      }
    },
    validators: {
      onSubmit: MarkBookReadFormSchema,
    },
  });
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          form.reset({
            pagesRead: markedBookProfileData?.page_count
              ? String(markedBookProfileData.page_count)
              : '',
            wordsRead: markedBookProfileData?.word_count
              ? String(markedBookProfileData.word_count)
              : '',
            rating: markedBookProfileData?.rating ?? undefined,
          });
        }
      }}
    >
      <Dialog.Trigger
        className={`py-2 px-10 rounded-md shadow-sm ${markedBookProfileData ? 'bg-gray-50 text-black border border-gray-600' : 'bg-green-bg text-white'} w-45 self-center`}
      >
        <div className="flex flex-row items-center justify-center gap-2">
          {markedBookProfileData && <CircleCheck size={20} color="green" />}
          {markedBookProfileData ? 'Read' : 'Mark Read'}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed bottom-0 inset-x-0 w-full max-h-[90dvh] flex flex-col overflow-hidden rounded-t-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-300 data-ending-style:translate-y-full data-ending-style:opacity-0 data-starting-style:translate-y-full data-starting-style:opacity-0 dark:outline-gray-300">
          <div className="flex flex-row justify-between pl-6 pr-6 pt-4 pb-4">
            <div>
              <Button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex justify-center items-center rounded-md transition-colors text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={16} />
              </Button>
            </div>
            <h2 className="text-lg font-semibold">
              {markedBookProfileData ? 'Edit book details' : 'Mark book as read'}
            </h2>
            <form.AppForm>
              <div>
                <form.SaveButton className="w-7 h-7 flex justify-center items-center rounded-md disabled:opacity-50">
                  Save
                </form.SaveButton>
              </div>
            </form.AppForm>
          </div>
          <Separator orientation="horizontal" className="h-px w-full bg-lightgray" />
          <form
            className="flex flex-col overflow-y-auto"
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
          >
            <div className="pt-6 pl-6 pr-6">
              <form.AppField
                name="pagesRead"
                children={(field) => <field.NumberField label="Pages read (optional)" />}
              />
            </div>
            <div className="pt-6 pl-6 pr-6">
              <form.AppField
                name="wordsRead"
                children={(field) => <field.NumberField label="Words read (optional)" />}
              />
            </div>
            <div className="p-6 flex justify-center">
              <form.AppField
                name="rating"
                children={(field) => <field.StarRatingField size={24} />}
              />
            </div>
          </form>
          {markedBookProfileData && (
            <div className="flex flex-row justify-center items-center pb-6">
              <Button>
                <div className="flex flex-row items-center gap-1">
                  <Trash2 size={16} />
                  <span>Reset book to unread</span>
                </div>
              </Button>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
