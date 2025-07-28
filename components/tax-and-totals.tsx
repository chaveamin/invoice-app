import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

export default function TaxAndTotals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>مجموع قیمت</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1">
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <span>قیمت کل:</span>
            <span>320,000 تومان</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
