'use client'

import { useState } from 'react'
import { MessageCircle, Shield } from 'lucide-react'

export default function AdminUsersPage() {
  const [selectedRole, setSelectedRole] = useState('All')

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joinDate: '2024-01-15', orders: 5, spent: '$1,495' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', joinDate: '2024-01-20', orders: 8, spent: '$2,392' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Customer', joinDate: '2024-02-01', orders: 3, spent: '$897' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', joinDate: '2023-12-01', orders: 0, spent: '$0' },
    { id: 5, name: 'Robert Brown', email: 'robert@example.com', role: 'Customer', joinDate: '2024-02-10', orders: 2, spent: '$599' },
  ]

  const filteredUsers = selectedRole === 'All' ? users : users.filter(u => u.role === selectedRole)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground mt-2">Manage customer accounts and permissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {['All', 'Customer', 'Admin'].map(role => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedRole === role
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-accent/20'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-bold text-foreground">Name</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Email</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Role</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Join Date</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Orders</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Total Spent</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{user.name}</td>
                  <td className="py-4 px-6 text-muted-foreground text-xs">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'Admin' && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{user.joinDate}</td>
                  <td className="py-4 px-6 text-foreground font-medium">{user.orders}</td>
                  <td className="py-4 px-6 font-bold text-foreground">{user.spent}</td>
                  <td className="py-4 px-6 flex items-center gap-2">
                    <button className="p-2 hover:bg-secondary rounded transition-colors">
                      <MessageCircle className="w-4 h-4 text-accent" />
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
