import {
  CreacteInvoiceRecordForm,
  type FormData,
} from "./CreateInvoiceRecordForm";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

const invoiceTypes = [
  { value: "standard", label: "Standard Invoice" },
  { value: "proforma", label: "Proforma Invoice" },
  { value: "correction", label: "Correction Invoice" },
];

const mockFunction = vi.fn((args: FormData) => console.log(args));

describe("CreateInvoiceRecordForm", () => {
  it("show the well-known render test - render form elements correctly", () => {
    render(
      <CreacteInvoiceRecordForm
        invoiceTypes={invoiceTypes}
        onSubmit={mockFunction}
      />
    );

    const invoiceTypeSelect = screen.getByRole("combobox", {
      name: /invoice type:/i,
    });
    expect(invoiceTypeSelect).toBeInTheDocument();

    const invoiceNumberField = screen.getByRole("textbox", {
      name: /invoice number:/i,
    });
    expect(invoiceNumberField).toBeInTheDocument();

    const submitButton = screen.getByRole("button", {
      name: /create invoice/i,
    });
    expect(submitButton).toBeInTheDocument();
  });

  it("show how to interact simulate user events - updates form data when inputs change", async () => {
    const user = userEvent.setup();
    render(
      <CreacteInvoiceRecordForm
        invoiceTypes={invoiceTypes}
        onSubmit={mockFunction}
      />
    );

    const typeSelect = screen.getByRole("combobox", {
      name: /invoice type:/i,
    });
    const numberInput = screen.getByRole("textbox", {
      name: /invoice number:/i,
    });

    await user.selectOptions(typeSelect, "standard");
    await user.type(numberInput, "INV-001");

    expect(typeSelect).toHaveValue("standard");
    expect(numberInput).toHaveValue("INV-001");
  });


  it("show how to test if some function was called - ", async () => {
    const user = userEvent.setup();
    render(
      <CreacteInvoiceRecordForm
        invoiceTypes={invoiceTypes}
        onSubmit={mockFunction}
      />
    );
    const submitButton = screen.getByRole("button", {
      name: /create invoice/i,
    });

    await user.click(submitButton);

    expect(mockFunction).toHaveBeenCalledWith({
      invoiceType: "",
      invoiceNumber: "",
    });

    const typeSelect = screen.getByRole("combobox", {
      name: /invoice type:/i,
    });
    const numberInput = screen.getByRole("textbox", {
      name: /invoice number:/i,
    });

    await userEvent.selectOptions(typeSelect, "standard");
    await userEvent.type(numberInput, "INV-001");

    await user.click(submitButton);

    expect(mockFunction).toHaveBeenCalledWith({
      invoiceType: "standard",
      invoiceNumber: "INV-001",
    });
  });

  it.todo("show how to find the best selectors to get elements - introduce testingPlayground"); 
});
