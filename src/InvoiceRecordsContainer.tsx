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
        const { data } = await axios.get<InvoiceType[]>(
          "http://localhost:3000/api/invoice-types"
        );

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-2xl mx-auto mt-10 bg-red-50 rounded-lg">
        <h1 className="text-2xl font-bold text-red-700 mb-2">
          Error: {error.message}
        </h1>
        {error.statusCode && (
          <p className="text-red-600">Status code: {error.statusCode}</p>
        )}
      </div>
    );
  }

  if (invoiceTypes.length > 1)
    return (
      <div className="p-6 max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Invoice Record Creator App
        </h1>
        <CreacteInvoiceRecordForm
          invoiceTypes={invoiceTypes}
          onSubmit={onSubmit}
        />
      </div>
    );

  if (invoiceTypes.length === 0)
    return (
      <div className="p-6 max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Invoice Record Creator App
        </h1>
        <p className="text-red-600 bg-red-50 p-4 rounded-lg">
          App is not configured well: There is no invoice options
        </p>
      </div>
    );
};
