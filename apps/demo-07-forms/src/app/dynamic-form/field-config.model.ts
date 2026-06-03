export type FieldType = 'text' | 'number' | 'select' | 'checkbox';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface FormConfig {
  title: string;
  fields: FieldConfig[];
}
