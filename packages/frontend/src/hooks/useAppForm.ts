import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MoneyField } from '@/components/Forms/Fields/MoneyField';
import { SliderField } from '@/components/Forms/Fields/SliderField';
import { SelectField } from '@/components/Forms/Fields/SelectField';
import { TextAreaField } from '@/components/Forms/Fields/TextAreaField';
import { SelectDateField } from '@/components/Forms/Fields/SelectDateField';
import { TextField } from '@/components/Forms/Fields/TextField';
import { SubscribeButton } from '@/components/Buttons/SubscribeButton';
import { StarRatingField } from '@/components/Forms/Fields/StarRatingField/StarRatingField';
import { NumberField } from '@/components/Forms/Fields/NumberField';
import { SaveButton } from '@/components/Buttons/SaveButton';
import { CheckboxField } from '@/components/Forms/Fields/CheckboxField';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    MoneyField,
    SliderField,
    SelectField,
    TextAreaField,
    SelectDateField,
    TextField,
    StarRatingField,
    NumberField,
    CheckboxField,
  },
  formComponents: {
    SubscribeButton,
    SaveButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
