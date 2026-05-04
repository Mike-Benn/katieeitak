import { Button } from '@base-ui/react';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MoneyField } from '@/components/Forms/Fields/MoneyField';
import { SliderField } from '@/components/Forms/Fields/SliderField';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    MoneyField,
    SliderField,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
