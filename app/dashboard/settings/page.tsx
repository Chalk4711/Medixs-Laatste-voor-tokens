'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [theme, setTheme] = useState({
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#ffffff',
  })

  const handleThemeChange = (key: string, value: string) => {
    setTheme(prevTheme => ({ ...prevTheme, [key]: value }))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the appearance of your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="primary">Primary Color</Label>
              <Input
                id="primary"
                type="color"
                value={theme.primary}
                onChange={(e) => handleThemeChange('primary', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secondary">Secondary Color</Label>
              <Input
                id="secondary"
                type="color"
                value={theme.secondary}
                onChange={(e) => handleThemeChange('secondary', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accent">Accent Color</Label>
              <Input
                id="accent"
                type="color"
                value={theme.accent}
                onChange={(e) => handleThemeChange('accent', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="background">Background Color</Label>
              <Input
                id="background"
                type="color"
                value={theme.background}
                onChange={(e) => handleThemeChange('background', e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}