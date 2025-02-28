import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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

  it("shows error message when fetch fails - 401", async () => {
    server.use(
      http.get("/api/invoice-types", () => {
        // return HttpResponse.error();
        return HttpResponse.json(
          {
            message: "Not authorized to see invoice types",
          },
          { status: 401 }
        );
      })
    );

    render(<InvoiceRecordsContainer />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    const errorContent = screen.getByRole("heading", {
      name: /error: not authorized to see invoice types/i,
    });
    const errorStatusCodeMessage = screen.getByText(/status code: 401/i);

    expect(errorContent).toBeInTheDocument();
    expect(errorStatusCodeMessage).toBeInTheDocument();
  });

  it("shows error message when fetch fails - 500", async () => {
    server.use(
      http.get("/api/invoice-types", () => {
        // return HttpResponse.error();
        return HttpResponse.json(
          {
            message: "Not authorized to see invoice types",
          },
          { status: 500 }
        );
      })
    );

    render(<InvoiceRecordsContainer />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    const errorContent = screen.getByRole("heading", {
      name: /error: not authorized to see invoice types/i,
    });
    const errorStatusCodeMessage = screen.getByText(/status code: 500/i);

    expect(errorContent).toBeInTheDocument();
    expect(errorStatusCodeMessage).toBeInTheDocument();
  });

  it("shows error message when fetch fails - 404", async () => {
    server.use(
      http.get("/api/invoice-types", () => {
        // return HttpResponse.error();
        return HttpResponse.json(
          {
            message: "Not authorized to see invoice types",
          },
          { status: 404 }
        );
      })
    );

    render(<InvoiceRecordsContainer />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    const errorContent = screen.getByRole("heading", {
      name: /error: not authorized to see invoice types/i,
    });
    const errorStatusCodeMessage = screen.getByText(/status code: 404/i);

    expect(errorContent).toBeInTheDocument();
    expect(errorStatusCodeMessage).toBeInTheDocument();
  });
});
