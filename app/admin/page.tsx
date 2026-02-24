'use client'

import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Sales',
      value: '$24,587',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      bg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Orders',
      value: '1,248',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      bg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Customers',
      value: '3,847',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      bg: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: 'Revenue Growth',
      value: '23.8%',
      change: '+4.1%',
      trend: 'up',
      icon: TrendingUp,
      bg: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  const recentOrders = [
    { id: 'VL-001', customer: 'John Doe', amount: '$299', status: 'Completed', date: '2024-02-20' },
    { id: 'VL-002', customer: 'Jane Smith', amount: '$599', status: 'Pending', date: '2024-02-20' },
    { id: 'VL-003', customer: 'Mike Johnson', amount: '$449', status: 'Processing', date: '2024-02-19' },
    { id: 'VL-004', customer: 'Sarah Wilson', amount: '$199', status: 'Completed', date: '2024-02-19' },
    { id: 'VL-005', customer: 'Robert Brown', amount: '$799', status: 'Completed', date: '2024-02-18' },
  ]

  const topProducts = [
    { name: 'Premium Silk Blouse', sold: 245, revenue: '$73,455' },
    { name: 'Leather Bag', sold: 189, revenue: '$113,211' },
    { name: 'Designer Heels', sold: 167, revenue: '$58,183' },
    { name: 'Cashmere Scarf', sold: 156, revenue: '$31,044' },
    { name: 'Wool Blazer', sold: 134, revenue: '$66,866' },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-background border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-sm font-medium mt-2 flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif font-bold text-foreground">Recent Orders</h2>
            <a href="/admin/orders" className="text-accent text-sm font-medium hover:underline">
              View All →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-foreground">{order.id}</td>
                    <td className="py-4 px-4 text-muted-foreground">{order.customer}</td>
                    <td className="py-4 px-4 font-bold text-foreground">{order.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif font-bold text-foreground">Top Products</h2>
            <a href="/admin/products" className="text-accent text-sm font-medium hover:underline">
              View All →
            </a>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="pb-4 border-b border-border last:border-0">
                <p className="font-medium text-foreground text-sm">{product.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{product.sold} sold</span>
                  <span className="font-bold text-foreground text-sm">{product.revenue}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
                  <div
                    className="bg-accent h-1.5 rounded-full"
                    style={{ width: `${(product.sold / 245) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
