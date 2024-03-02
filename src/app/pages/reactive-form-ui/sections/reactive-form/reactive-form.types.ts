export interface FormField {
  label: string;
  file?: any;
  value: string | number | boolean;
  description?: string;
  disabled?: true;
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'date'
    | 'checkbox'
    | 'url'
    | 'tel'
    | 'search'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'file'
    | 'range'
    | 'color'
    | 'radio'
    | 'select'
    | 'text-area'
    | 'username'
    | 'hidden';
  validators?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    email?: boolean;
  };
  options?: { label: string; value: string }[];
}

export interface IFormData {
  [key: string]: FormField;
}
