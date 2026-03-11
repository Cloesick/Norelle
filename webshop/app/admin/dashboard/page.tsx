'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ChartBarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CogIcon,
  CubeIcon,
  CreditCardIcon,
  BellIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'analytics' | 'settings'>('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month')

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('norell_admin_session')
    if (!session) {
      router.push('/admin/login')
      return
    }

    const sessionData = JSON.parse(session)
    if (sessionData.type !== 'admin') {
      router.push('/admin/login')
      return
    }

    setAdmin(sessionData)
  }, [router])

  // Enhanced admin statistics
  const adminStats = {
    revenue: {
      today: 2450,
      week: 12450,
      month: 45678,
      year: 234567,
      growth: 12.5
    },
    orders: {
      pending: 23,
      processing: 45,
      completed: 156,
      total: 234,
      growth: 8.3
    },
    customers: {
      new: 47,
      active: 892,
      total: 1234,
      churn: 2.1,
      growth: 15.7
    },
    products: {
      total: 156,
      inStock: 142,
      lowStock: 8,
      outOfStock: 6,
      featured: 24
    },
    conversion: {
      rate: 3.2,
      trend: 'down',
      change: -0.3
    },
    avgOrderValue: {
      current: 195.23,
      previous: 182.45,
      growth: 7.0
    }
  }

  const recentOrders = [
    { id: 'NOR-1001', customer: 'Alexandra Dubois', total: 245.50, status: 'processing', date: '2024-01-15', items: 3 },
    { id: 'NOR-1002', customer: 'Nicolas Bernard', total: 189.99, status: 'pending', date: '2024-01-15', items: 2 },
    { id: 'NOR-1003', customer: 'Sophie Martin', total: 425.00, status: 'completed', date: '2024-01-14', items: 5 },
    { id: 'NOR-1004', customer: 'Thomas Laurent', total: 156.75, status: 'processing', date: '2024-01-14', items: 1 },
    { id: 'NOR-1005', customer: 'Marie Dupont', total: 312.25, status: 'shipped', date: '2024-01-13', items: 4 }
  ]

  const topProducts = [
    { id: 1, name: 'Aurelia Gold Necklace', category: 'Necklaces', sold: 47, revenue: 11750, trend: 'up' },
    { id: 2, name: 'Luna Pearl Earrings', category: 'Earrings', sold: 38, revenue: 9120, trend: 'up' },
    { id: 3, name: 'Stellar Diamond Ring', category: 'Rings', sold: 29, revenue: 14500, trend: 'down' },
    { id: 4, name: 'Celestial Silver Bracelet', category: 'Bracelets', sold: 25, revenue: 6250, trend: 'up' },
    { id: 5, name: 'Ethereal Rose Pendant', category: 'Necklaces', sold: 22, revenue: 5500, trend: 'stable' }
  ]

  const alerts = [
    { type: 'warning', message: '8 products running low on stock', count: 8 },
    { type: 'error', message: 'Payment gateway issue detected', count: 1 },
    { type: 'info', message: 'New customer registrations increased', count: 47 },
    { type: 'success', message: 'Monthly revenue target achieved', count: 1 }
  ]

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'products', label: 'Products', icon: CubeIcon },
    { id: 'orders', label: 'Orders', icon: ShoppingBagIcon },
    { id: 'customers', label: 'Customers', icon: UserGroupIcon },
    { id: 'analytics', label: 'Analytics', icon: ArrowTrendingUpIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900/20 text-green-400 border border-green-800/30'
      case 'processing': return 'bg-blue-900/20 text-blue-400 border border-blue-800/30'
      case 'pending': return 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30'
      case 'shipped': return 'bg-purple-900/20 text-purple-400 border border-purple-800/30'
      default: return 'bg-gray-900/20 text-gray-400 border border-gray-800/30'
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-900/20 text-red-400 border border-red-800/30'
      case 'warning': return 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30'
      case 'success': return 'bg-green-900/20 text-green-400 border border-green-800/30'
      case 'info': return 'bg-blue-900/20 text-blue-400 border border-blue-800/30'
      default: return 'bg-gray-900/20 text-gray-400 border border-gray-800/30'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
      case 'down': return <ArrowTrendingDownIcon className="w-4 h-4 text-red-400" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${getAlertColor(alert.type)}`}>
              <div className="flex items-center space-x-3">
                {alert.type === 'error' && <ExclamationTriangleIcon className="w-5 h-5" />}
                {alert.type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5" />}
                {alert.type === 'success' && <CheckCircleIcon className="w-5 h-5" />}
                {alert.type === 'info' && <BellIcon className="w-5 h-5" />}
                <span className="text-sm">{alert.message}</span>
              </div>
              <span className="text-xs font-medium">{alert.count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Revenue (Month)</span>
            <CurrencyDollarIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">€{adminStats.revenue.month.toLocaleString()}</div>
          <div className="flex items-center space-x-2 text-sm">
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
            <span className="text-green-400">+{adminStats.revenue.growth}%</span>
            <span className="text-norelle-text-muted">vs last month</span>
          </div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Orders</span>
            <ShoppingBagIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">{adminStats.orders.total}</div>
          <div className="flex items-center space-x-2 text-sm">
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
            <span className="text-green-400">+{adminStats.orders.growth}%</span>
            <span className="text-norelle-text-muted">vs last month</span>
          </div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Customers</span>
            <UserGroupIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">{adminStats.customers.total}</div>
          <div className="flex items-center space-x-2 text-sm">
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
            <span className="text-green-400">+{adminStats.customers.growth}%</span>
            <span className="text-norelle-text-muted">new this month</span>
          </div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Conversion Rate</span>
            <ChartBarIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">{adminStats.conversion.rate}%</div>
          <div className="flex items-center space-x-2 text-sm">
            <ArrowTrendingDownIcon className="w-4 h-4 text-red-400" />
            <span className="text-red-400">{adminStats.conversion.change}%</span>
            <span className="text-norelle-text-muted">vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-bold text-norelle-cream">Recent Orders</h2>
            <Link href="/admin/orders" className="text-norelle-text-muted hover:text-norelle-cream text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-norelle-burgundy/50 rounded-lg">
                <div>
                  <div className="text-norelle-cream font-medium">{order.id}</div>
                  <div className="text-sm text-norelle-text-muted">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="text-norelle-cream font-medium">€{order.total.toFixed(2)}</div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-bold text-norelle-cream">Top Products</h2>
            <Link href="/admin/products" className="text-norelle-text-muted hover:text-norelle-cream text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-norelle-text-muted w-6">#{index + 1}</span>
                  <div>
                    <div className="text-norelle-cream font-medium">{product.name}</div>
                    <div className="text-sm text-norelle-text-muted">{product.category}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-norelle-cream font-medium">{product.sold} sold</div>
                    <div className="text-sm text-norelle-text-muted">€{product.revenue.toLocaleString()}</div>
                  </div>
                  {getTrendIcon(product.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
        <h2 className="text-xl font-serif font-bold text-norelle-cream mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-norelle-burgundy/50 border border-norelle-border rounded-lg hover:bg-norelle-burgundy transition-colors duration-200">
            <PlusIcon className="w-6 h-6 text-norelle-cream mb-2" />
            <div className="text-norelle-cream font-medium">Add Product</div>
            <div className="text-sm text-norelle-text-muted">Create new product</div>
          </button>
          <button className="p-4 bg-norelle-burgundy/50 border border-norelle-border rounded-lg hover:bg-norelle-burgundy transition-colors duration-200">
            <UserGroupIcon className="w-6 h-6 text-norelle-cream mb-2" />
            <div className="text-norelle-cream font-medium">View Customers</div>
            <div className="text-sm text-norelle-text-muted">Manage customers</div>
          </button>
          <button className="p-4 bg-norelle-burgundy/50 border border-norelle-border rounded-lg hover:bg-norelle-burgundy transition-colors duration-200">
            <CreditCardIcon className="w-6 h-6 text-norelle-cream mb-2" />
            <div className="text-norelle-cream font-medium">Process Orders</div>
            <div className="text-sm text-norelle-text-muted">Handle pending orders</div>
          </button>
          <button className="p-4 bg-norelle-burgundy/50 border border-norelle-border rounded-lg hover:bg-norelle-burgundy transition-colors duration-200">
            <ChartBarIcon className="w-6 h-6 text-norelle-cream mb-2" />
            <div className="text-norelle-cream font-medium">View Analytics</div>
            <div className="text-sm text-norelle-text-muted">Detailed reports</div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-norelle-cream">Product Management</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-norelle-burgundy border border-norelle-border rounded-md text-norelle-cream placeholder-norelle-text-muted focus:outline-none focus:ring-2 focus:ring-norelle-cream focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-norelle-text-muted" />
          </div>
          <button className="btn-primary inline-flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-norelle-cream">{adminStats.products.total}</div>
          <div className="text-sm text-norelle-text-muted">Total Products</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{adminStats.products.inStock}</div>
          <div className="text-sm text-norelle-text-muted">In Stock</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{adminStats.products.lowStock}</div>
          <div className="text-sm text-norelle-text-muted">Low Stock</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{adminStats.products.outOfStock}</div>
          <div className="text-sm text-norelle-text-muted">Out of Stock</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-norelle-border">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-1 bg-norelle-burgundy border border-norelle-border rounded-md text-sm text-norelle-cream">
              <FunnelIcon className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <select className="px-3 py-1 bg-norelle-burgundy border border-norelle-border rounded-md text-sm text-norelle-cream">
              <option>All Categories</option>
              <option>Necklaces</option>
              <option>Earrings</option>
              <option>Rings</option>
              <option>Bracelets</option>
            </select>
            <select className="px-3 py-1 bg-norelle-burgundy border border-norelle-border rounded-md text-sm text-norelle-cream">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-norelle-border">
                <th className="text-left py-3 px-4 text-norelle-text-muted">Product</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">SKU</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Price</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Stock</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Status</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id} className="border-b border-norelle-border/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-norelle-burgundy border border-norelle-border rounded flex items-center justify-center">
                        <CubeIcon className="w-6 h-6 text-norelle-cream" />
                      </div>
                      <div>
                        <div className="text-norelle-cream font-medium">{product.name}</div>
                        <div className="text-sm text-norelle-text-muted">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-norelle-text-muted">NOR-{String(product.id).padStart(4, '0')}</td>
                  <td className="py-3 px-4">
                    <div className="text-norelle-cream">€{(Math.random() * 500 + 100).toFixed(2)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded bg-green-900/20 text-green-400 border border-green-800/30">
                      {Math.floor(Math.random() * 50 + 10)} in stock
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded bg-norelle-cream text-norelle-burgundy">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-norelle-text-muted hover:text-red-400 transition-colors duration-200">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-norelle-cream">Order Management</h2>
        <div className="flex space-x-4">
          <select className="px-4 py-2 bg-norelle-burgundy border border-norelle-border rounded-md text-norelle-cream">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
          <button className="btn-secondary inline-flex items-center">
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{adminStats.orders.pending}</div>
          <div className="text-sm text-norelle-text-muted">Pending</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{adminStats.orders.processing}</div>
          <div className="text-sm text-norelle-text-muted">Processing</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{adminStats.orders.completed}</div>
          <div className="text-sm text-norelle-text-muted">Completed</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-norelle-cream">{adminStats.orders.total}</div>
          <div className="text-sm text-norelle-text-muted">Total Orders</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-norelle-border">
                <th className="text-left py-3 px-4 text-norelle-text-muted">Order ID</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Customer</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Items</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Total</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Status</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Date</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-norelle-border/50">
                  <td className="py-3 px-4 text-norelle-cream font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-norelle-text-muted">{order.customer}</td>
                  <td className="py-3 px-4 text-norelle-text-muted">{order.items}</td>
                  <td className="py-3 px-4 text-norelle-cream">€{order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-norelle-text-muted">{order.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {order.status === 'pending' && (
                        <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                          <CheckCircleIcon className="w-4 h-4" />
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                          <TruckIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-norelle-cream">Customer Management</h2>
        <button className="btn-primary inline-flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-norelle-cream">{adminStats.customers.total}</div>
          <div className="text-sm text-norelle-text-muted">Total Customers</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{adminStats.customers.new}</div>
          <div className="text-sm text-norelle-text-muted">New This Month</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{adminStats.customers.active}</div>
          <div className="text-sm text-norelle-text-muted">Active Customers</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{adminStats.customers.churn}%</div>
          <div className="text-sm text-norelle-text-muted">Churn Rate</div>
        </div>
      </div>

      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8 text-center">
        <p className="text-norelle-text-muted">Customer management features coming soon...</p>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-norelle-cream">Analytics & Reports</h2>
        <div className="flex space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 bg-norelle-burgundy border border-norelle-border rounded-md text-norelle-cream"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn-secondary inline-flex items-center">
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8 text-center">
        <p className="text-norelle-text-muted">Advanced analytics dashboard coming soon...</p>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-norelle-cream">Store Settings</h2>
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8 text-center">
        <p className="text-norelle-text-muted">Settings panel coming soon...</p>
      </div>
    </div>
  )

  if (!admin) {
    return <div className="min-h-screen bg-norelle-burgundy flex items-center justify-center">
      <div className="text-norelle-cream">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
                Admin Dashboard
              </h1>
              <p className="text-norelle-text-muted">
                Welcome back, {admin.name}! Manage your store operations.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="btn-secondary">
                View Store
              </Link>
              <button 
                onClick={() => {
                  localStorage.removeItem('norell_admin_session')
                  router.push('/admin/login')
                }}
                className="btn-secondary"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-norelle-burgundy text-norelle-cream'
                        : 'text-norelle-text-muted hover:text-norelle-cream'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'customers' && renderCustomers()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && renderSettings()}
          </main>
        </div>
      </div>
    </div>
  )
}
