import { FormConfig } from './field-config.model';

export const NEW_CLIENT_FORM: FormConfig = {
  title: 'New Client Onboarding',
  fields: [
    {
      key: 'clientName',
      label: 'Client Name',
      type: 'text',
      required: true,
      placeholder: 'Full legal name',
    },
    {
      key: 'accountType',
      label: 'Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'ISA', label: 'ISA' },
        { value: 'SIPP', label: 'SIPP' },
        { value: 'GIA', label: 'GIA' },
      ],
    },
    {
      key: 'initialDeposit',
      label: 'Initial Deposit (£)',
      type: 'number',
      min: 1000,
      placeholder: 'Min. £1,000',
    },
    {
      key: 'newsletter',
      label: 'Subscribe to Newsletter',
      type: 'checkbox',
    },
  ],
};

export const TRADE_ORDER_FORM: FormConfig = {
  title: 'Trade Order Entry',
  fields: [
    {
      key: 'symbol',
      label: 'Symbol',
      type: 'text',
      required: true,
      placeholder: 'e.g. AAPL',
    },
    {
      key: 'side',
      label: 'Side',
      type: 'select',
      options: [
        { value: 'buy', label: 'Buy' },
        { value: 'sell', label: 'Sell' },
      ],
    },
    {
      key: 'quantity',
      label: 'Quantity',
      type: 'number',
      min: 1,
      required: true,
      placeholder: 'Number of shares',
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'text',
      placeholder: 'Optional order notes',
    },
  ],
};
