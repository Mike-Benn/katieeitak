import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MoneyField } from '@/components/Forms/Fields/MoneyField';
import { SliderField } from '@/components/Forms/Fields/SliderField';
import { SelectField } from '@/components/Forms/Fields/SelectField';
import { TextAreaField } from '@/components/Forms/Fields/TextAreaField';
import { SelectDateField } from '@/components/Forms/Fields/SelectDateField';
import { TextField } from '@/components/Forms/Fields/TextField';
import { SubscribeButton } from '@/components/Buttons/SubscribeButton';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    MoneyField,
    SliderField,
    SelectField,
    TextAreaField,
    SelectDateField,
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
