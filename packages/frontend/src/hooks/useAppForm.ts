import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MoneyField } from '@/components/Forms/Fields/MoneyField';
import { SliderField } from '@/components/Forms/Fields/SliderField';
import { SelectField } from '@/components/Forms/Fields/SelectField';
import { TextAreaField } from '@/components/Forms/Fields/TextAreaField';
import { SelectDateField } from '@/components/Forms/Fields/SelectDateField';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    MoneyField,
    SliderField,
    SelectField,
    TextAreaField,
    SelectDateField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
