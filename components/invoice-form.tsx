import BasicDetails from "./basic-details";
import ContactDetails from "./contact-details";
import ItemsList from "./items-list";
import TaxAndTotals from "./tax-and-totals";
import TemplateManager from "./template-manager";

export default function InvoiceForm() {
  return (
    <div className="space-y-6">
      <TemplateManager />
      <BasicDetails />
      <ContactDetails />
      <ItemsList />
      <TaxAndTotals />
    </div>
  );
}
