import React, { useState } from "react";

export interface FormData {
  invoiceType: string;
  invoiceNumber: string;
}

export const CreacteInvoiceRecordForm = ({
  invoiceTypes = [],
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
  invoiceTypes: Array<{ value: string; label: string }>;
}) => {
  const [formData, setFormData] = useState<FormData>({
    invoiceType: "",
    invoiceNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="invoiceType">Invoice Type:</label>
        <select
          id="invoiceType"
          name="invoiceType"
          value={formData.invoiceType}
          onChange={handleChange}
        >
          <option value="">Select invoice type</option>
          {invoiceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="invoiceNumber">Invoice Number:</label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          placeholder="Enter invoice number"
        />
      </div>

      <button type="submit">Create Invoice</button>
    </form>
  );
};
