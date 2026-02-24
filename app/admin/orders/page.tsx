'use client'

import { useState } from 'react'
import { Eye, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState('All')

  const orders = [
    { id: 'VL-001', customer: 'John Doe', email: 'john@example.com', amount: '$299.00', status: 'Completed', date: '2024-02-20', items: 1 },
    { id: 'VL-002', customer: 'Jane Smith', email: 'jane@example.com', amount: '$599.00', status: 'Processing', date: '2024-02-20', items: 2 },
    { id: 'VL-003', customer: 'Mike Johnson', email: 'mike@example.com', amount: '$449.00', status: 'Pending', date: '2024-02-19', items: 1 },
    { id: 'VL-004', customer: 'Sarah Wilson', email: 'sarah@example.com', amount: '$199.00', status: 'Completed', date: '2024-02-19', items: 1 },
    { id: 'VL-005', customer: 'Robert Brown', email: 'robert@example.com', amount: '$799.00', status: 'Completed', date: '2024-02-18', items: 3 },
  ]

  const filteredOrders = selectedStatus === 'All' ? orders : orders.filter(o => o.status === selectedStatus)

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'Processing': return 'bg-blue-100 text-blue-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {['All', 'Completed', 'Processing', 'Pending'].map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedStatus === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-accent/20'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-bold text-foreground">Order ID</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Customer</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Email</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Amount</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Items</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Date</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{order.id}</td>
                  <td className="py-4 px-6 text-foreground">{order.customer}</td>
                  <td className="py-4 px-6 text-muted-foreground text-xs">{order.email}</td>
                  <td className="py-4 px-6 font-bold text-foreground">{order.amount}</td>
                  <td className="py-4 px-6 text-muted-foreground">{order.items}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                  <td className="py-4 px-6 flex items-center gap-2">
                    <button className="p-2 hover:bg-secondary rounded transition-colors">
                      <Eye className="w-4 h-4 text-accent" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded transition-colors">
                      <Download className="w-4 h-4 text-accent" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
