import { PageWrapper } from '@/components/PageWrapper';
import { calculatePay } from '@/utils/calculatePay';
import { useAppForm } from '@/hooks/useAppForm';
import { DisabledField } from '@/components/Forms/Fields/DisabledField';
import { useStore } from '@tanstack/react-form';

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
    <PageWrapper className="p-6 items-center gap-6">
      <h2 className="text-2xl font-semibold">Paycheck Calculator</h2>
      <form
        className="w-full flex flex-col gap-8"
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
        <DisabledField label="Net Pay" value={pay.net} />
      </form>
    </PageWrapper>
  );
}
