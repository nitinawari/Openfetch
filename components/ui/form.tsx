// form.tsx
import React, { createContext, useContext, useId } from 'react';
import { Label } from './label';
import { 
  useFormContext, 
  Controller, 
  FormProvider, 
  UseFormReturn,
  FieldValues,
  FieldPath,
  ControllerProps
} from 'react-hook-form';


// ============================================
// 1. FORM COMPONENT (Root wrapper)
// ============================================
// This wraps RHF's FormProvider and handles form submission

interface FormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>;
  children: React.ReactNode;
  onSubmit: (data: T) => void;  // T is our form data like { email: string, password: string } , this is generic type  , typescript concept 
}

function Form<T extends FieldValues>({ // Form must receive object of key, value pair  , also ...porps menas all other field of form like action,classname, id 
  form, 
  children, 
  onSubmit,
  ...props 
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>  
        {children}
      </form>
    </FormProvider>
  );
}

// ============================================
// 2. FORM FIELD CONTEXT
// ============================================
// This context provides field-specific data to child components

type FormFieldContextValue = {
  name: string;
  id: string;
  error?: string;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null); //passing context to children of formfeild component 

const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within FormField');
  }
  return context;
};
//This is a safety check. If someone tries to use <FormLabel /> outside <FormField>, they get a helpful error instead of a crash.


// ============================================
// 3. FORM FIELD COMPONENT
// ============================================
// This wraps RHF's Controller and provides field context

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  children: React.ReactNode;
}

function FormField<T extends FieldValues>({ 
  name, 
  children 
}: FormFieldProps<T>) {
  const { control, formState } = useFormContext<T>();
  const id = useId();
  const error = formState.errors[name]?.message as string | undefined;

  return (
    <FormFieldContext.Provider value={{ name, id, error }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormFieldInner field={field}>
            {children}
          </FormFieldInner>
        )}
      />
    </FormFieldContext.Provider>
  );
}

// Internal component that receives the field prop from Controller
const FormFieldInner = ({ 
  field, 
  children 
}: { 
  field: any; 
  children: React.ReactNode 
}) => {
  return (
    <FormFieldControlContext.Provider value={field}>
      {children}
    </FormFieldControlContext.Provider>
  );
};

// ============================================
// 4. FORM FIELD CONTROL CONTEXT
// ============================================
// This passes RHF's field props (onChange, value, etc.) to the input

const FormFieldControlContext = createContext<any>(null);

const useFormFieldControl = () => {
  const context = useContext(FormFieldControlContext);
  if (!context) {
    throw new Error('useFormFieldControl must be used within FormField');
  }
  return context;
};

// ============================================
// 5. FORM ITEM COMPONENT
// ============================================
// Container for spacing and layout

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormItem = ({ children, className = '', ...props }: FormItemProps) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

// ============================================
// 6. FORM LABEL COMPONENT
// ============================================
// Connected to input via htmlFor

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const FormLabel = ({ children, className = '', ...props }: FormLabelProps) => {
  const { id } = useFormField();
  
  return (
    <Label 
      htmlFor={id}
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    >
      {children}
    </Label>
  );
};

// ============================================
// 7. FORM CONTROL COMPONENT
// ============================================
// Wraps the actual input and passes RHF field props to it

interface FormControlProps {
  children: React.ReactElement;
}

const FormControl = ({ children }: FormControlProps) => {
  const { id, error } = useFormField();
  const field = useFormFieldControl();

  // Clone the child element and pass it the necessary props
  return React.cloneElement(children, {
    id,
    ...field,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
  });
};

// ============================================
// 8. FORM MESSAGE COMPONENT
// ============================================
// Displays validation errors

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = ({ className = '', ...props }: FormMessageProps) => {
  const { id, error } = useFormField();

  if (!error) return null;

  return (
    <p
      id={`${id}-error`}
      className={`text-sm text-red-600 ${className}`}
      {...props}
    >
      {error}
    </p>
  );
};

// ============================================
// EXPORTS
// ============================================

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useFormField,
};