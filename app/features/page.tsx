import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Features</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gain insights from your data with our powerful analytics tools.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cloud Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Seamlessly integrate with popular cloud services and platforms.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>24/7 Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our dedicated support team is always ready to assist you.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}