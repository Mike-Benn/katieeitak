import { Button } from '@base-ui/react';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MoneyField } from '@/components/Forms/Fields/MoneyField';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    MoneyField,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
