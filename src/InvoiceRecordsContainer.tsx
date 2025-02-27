import { useEffect, useState } from "react";
import { CreacteInvoiceRecordForm } from "./CreateInvoiceRecordForm";

interface InvoiceType {
  value: string;
  label: string;
}

export const InvoiceRecordsContainer = () => {
  const [invoiceTypes, setInvoiceTypes] = useState<InvoiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoiceTypes = async () => {
      try {
        const response = await fetch("/api/invoice-types");
        if (!response.ok) {
          throw new Error("Failed to fetch invoice types");
        }
        const data = await response.json();
        setInvoiceTypes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoiceTypes();
  }, []);

  const onSubmit = () => {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Invoice Record Creator App</h1>
      <CreacteInvoiceRecordForm
        invoiceTypes={invoiceTypes}
        onSubmit={onSubmit}
      />
    </div>
  );
};
