'use client'

import { TrendingUp, Calendar } from 'lucide-react'

export default function AdminAnalyticsPage() {
  const monthlyData = [
    { month: 'Jan', sales: 4000, orders: 240, customers: 24 },
    { month: 'Feb', sales: 3000, orders: 221, customers: 22 },
    { month: 'Mar', sales: 2000, orders: 229, customers: 20 },
    { month: 'Apr', sales: 2780, orders: 200, customers: 28 },
    { month: 'May', sales: 1890, orders: 229, customers: 21 },
    { month: 'Jun', sales: 2390, orders: 200, customers: 29 },
  ]

  const topCategories = [
    { name: 'Clothing', percentage: 45, value: '$10,908' },
    { name: 'Accessories', percentage: 30, value: '$7,272' },
    { name: 'Footwear', percentage: 25, value: '$6,060' },
  ]

  const conversionMetrics = [
    { label: 'Conversion Rate', value: '3.24%', change: '+0.81%', trend: 'up' },
    { label: 'Avg Order Value', value: '$287.50', change: '+15.3%', trend: 'up' },
    { label: 'Cart Abandonment', value: '23.4%', change: '-2.5%', trend: 'down' },
    { label: 'Customer Lifetime Value', value: '$1,245', change: '+8.2%', trend: 'up' },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2">Track your business performance and metrics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Last 30 Days</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {conversionMetrics.map((metric, index) => (
          <div key={index} className="bg-background border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
            <p className="text-2xl font-bold text-foreground mb-2">{metric.value}</p>
            <p className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-serif font-bold text-foreground mb-6">Monthly Sales Trend</h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{data.month}</span>
                  <span className="font-bold text-foreground">${(data.sales / 1000).toFixed(1)}K</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${(data.sales / 4000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-serif font-bold text-foreground mb-6">Sales by Category</h2>
          <div className="space-y-6">
            {topCategories.map((cat, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground text-sm">{cat.name}</span>
                  <span className="font-bold text-foreground text-sm">{cat.percentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full"
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{cat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Monthly Orders */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-serif font-bold text-foreground mb-6">Monthly Orders</h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                <span className="font-medium text-foreground">{data.month}</span>
                <span className="text-2xl font-bold text-accent">{data.orders}</span>
              </div>
            ))}
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-serif font-bold text-foreground mb-6">New Customers</h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                <span className="font-medium text-foreground">{data.month}</span>
                <span className="text-2xl font-bold text-accent">{data.customers}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
