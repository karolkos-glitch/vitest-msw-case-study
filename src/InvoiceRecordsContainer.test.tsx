import { render, screen, waitFor } from "@testing-library/react";
import { InvoiceRecordsContainer } from "./InvoiceRecordsContainer";
import { server } from "./mocks/node";
import { http, HttpResponse } from "msw";

describe("InvoiceRecordsContainer", () => {
  it("shows loading state initially", () => {
    render(<InvoiceRecordsContainer />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders invoice types after successful fetch", async () => {
    render(<InvoiceRecordsContainer />);

    await waitFor(() => {
      expect(
        screen.getByText(/Invoice Record Creator App/)
      ).toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    server.use(
      http.get("/api/invoice-types", () => {
        return HttpResponse.error();
      })
    );

    render(<InvoiceRecordsContainer />);

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
    });
  });
});
