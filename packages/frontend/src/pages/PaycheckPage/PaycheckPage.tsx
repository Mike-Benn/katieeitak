import { PageWrapper } from '@/components/PageWrapper';
import { calculatePay } from '@/utils/calculatePay';
import { useAppForm } from '@/hooks/useAppForm';
import { DisabledField } from '@/components/Forms/Fields/DisabledField';
import { useStore } from '@tanstack/react-form';
import { Separator } from '@base-ui/react';

export function PaycheckPage() {
  const form = useAppForm({
    defaultValues: {
      regularHours: '',
      overtimeHours: '',
      nightshiftHours: '',
      weekendHours: '',
      holidayHours: '',
    },
  });

  const formValues = useStore(form.store, (state) => state.values);
  const pay = calculatePay(formValues);
  return (
    <PageWrapper className="p-6 gap-6">
      <h1 className="text-2xl font-semibold">Paycheck Calculator</h1>
      <form
        className="flex flex-col gap-8 bg-white p-6 rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <form.AppField
          name="regularHours"
          children={(field) => <field.MoneyField label="Regular Hours" />}
        />
        <form.AppField
          name="overtimeHours"
          children={(field) => <field.MoneyField label="Overtime Hours" />}
        />
        <form.AppField
          name="nightshiftHours"
          children={(field) => <field.MoneyField label="Nightshift Hours" />}
        />
        <form.AppField
          name="weekendHours"
          children={(field) => <field.MoneyField label="Weekend Hours" />}
        />
        <form.AppField
          name="holidayHours"
          children={(field) => <field.MoneyField label="Holiday Hours" />}
        />
        <DisabledField label="Gross Pay" value={pay.gross} />
        <DisabledField label="Net Pay" value={pay.net} className="pb-2" />
        <Separator orientation="horizontal" className="h-px bg-lightgray w-full" />
        <DisabledField label="Excess Pay" value={pay.excess} />
      </form>
    </PageWrapper>
  );
}
