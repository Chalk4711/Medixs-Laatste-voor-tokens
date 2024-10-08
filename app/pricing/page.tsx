import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pricing Plans</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$9.99/mo</p>
            <ul className="mt-4 space-y-2">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <Button className="mt-4 w-full">Choose Plan</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$19.99/mo</p>
            <ul className="mt-4 space-y-2">
              <li>All Basic features</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
            </ul>
            <Button className="mt-4 w-full">Choose Plan</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Custom</p>
            <ul className="mt-4 space-y-2">
              <li>All Pro features</li>
              <li>Custom integrations</li>
              <li>Dedicated support</li>
            </ul>
            <Button className="mt-4 w-full">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}