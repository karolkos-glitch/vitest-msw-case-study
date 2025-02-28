import { useEffect, useState } from "react";
import { CreacteInvoiceRecordForm } from "./CreateInvoiceRecordForm";
import axios, { isAxiosError } from "axios";

interface InvoiceType {
  value: string;
  label: string;
}

export const InvoiceRecordsContainer = () => {
  const [invoiceTypes, setInvoiceTypes] = useState<InvoiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    statusCode?: string;
  } | null>(null);

  useEffect(() => {
    const fetchInvoiceTypes = async () => {
      try {
        const { data } = await axios.get<InvoiceType[]>("/api/invoice-types");
        setInvoiceTypes(data);
      } catch (err) {
        setError({
          message: isAxiosError(err)
            ? err.response?.data?.message
            : "An error occurred",
          statusCode: isAxiosError(err) ? String(err.status) : undefined,
        });
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
    return (
      <div>
        <h1>Error: {error.message}</h1>
        <p>{error.statusCode ? `Status code: ${error.statusCode}` : null}</p>
      </div>
    );
  }

  if (invoiceTypes)
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
