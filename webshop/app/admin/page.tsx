'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { products } from '@/data/products'
import { Product } from '@/types'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'settings'>('dashboard')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Mock statistics
  const stats = {
    totalRevenue: 45678,
    totalOrders: 234,
    totalCustomers: 189,
    conversionRate: 3.2,
    avgOrderValue: 195.23,
    topProduct: products[0]
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'products', label: 'Products', icon: ShoppingBagIcon },
    { id: 'orders', label: 'Orders', icon: UsersIcon },
    { id: 'settings', label: 'Settings', icon: CurrencyDollarIcon }
  ]

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would call an API
      console.log('Delete product:', productId)
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Total Revenue</span>
            <CurrencyDollarIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">€{stats.totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-green-400">+12% from last month</div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Total Orders</span>
            <ShoppingBagIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">{stats.totalOrders}</div>
          <div className="text-sm text-green-400">+8% from last month</div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Customers</span>
            <UsersIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">{stats.totalCustomers}</div>
          <div className="text-sm text-green-400">+15% from last month</div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Conversion Rate</span>
            <ChartBarIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">{stats.conversionRate}%</div>
          <div className="text-sm text-orange-400">-2% from last month</div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
        <h2 className="text-xl font-serif font-bold text-norelle-cream mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-norelle-border">
                <th className="text-left py-3 px-4 text-norelle-text-muted">Order #</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Customer</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Total</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Status</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-norelle-border/50">
                  <td className="py-3 px-4 text-norelle-cream">NOR-1000{i}</td>
                  <td className="py-3 px-4 text-norelle-text-muted">Customer {i}</td>
                  <td className="py-3 px-4 text-norelle-cream">€{(Math.random() * 500 + 100).toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/20 text-yellow-400 border border-yellow-800/30">
                      Processing
                    </span>
                  </td>
                  <td className="py-3 px-4 text-norelle-text-muted">2024-01-{10 + i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
        <h2 className="text-xl font-serif font-bold text-norelle-cream mb-4">Top Products</h2>
        <div className="space-y-3">
          {products.slice(0, 5).map((product, index) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-norelle-text-muted w-8">#{index + 1}</span>
                <div>
                  <div className="text-norelle-cream font-medium">{product.name}</div>
                  <div className="text-sm text-norelle-text-muted">{product.categories[0].name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-norelle-cream font-medium">{Math.floor(Math.random() * 50 + 10)} sold</div>
                <div className="text-sm text-norelle-text-muted">€{((Math.random() * 50 + 10) * (product.salePrice || product.price)).toFixed(0)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-norelle-cream">Products</h2>
        <button className="btn-primary inline-flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
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
              {products.map((product) => (
                <tr key={product.id} className="border-b border-norelle-border/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-norelle-burgundy border border-norelle-border rounded flex items-center justify-center">
                        <span className="text-xs text-norelle-cream">IMG</span>
                      </div>
                      <div>
                        <div className="text-norelle-cream font-medium">{product.name}</div>
                        <div className="text-sm text-norelle-text-muted">{product.categories[0].name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-norelle-text-muted">{product.sku}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-norelle-cream">€{product.price.toFixed(2)}</div>
                      {product.salePrice && (
                        <div className="text-sm text-green-400">€{product.salePrice.toFixed(2)}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      product.stock > 10 
                        ? 'bg-green-900/20 text-green-400 border border-green-800/30'
                        : 'bg-orange-900/20 text-orange-400 border border-orange-800/30'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {product.featured && (
                        <span className="px-2 py-1 text-xs rounded bg-norelle-cream text-norelle-burgundy">
                          Featured
                        </span>
                      )}
                      {product.salePrice && (
                        <span className="px-2 py-1 text-xs rounded bg-red-600 text-white">
                          Sale
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-norelle-text-muted hover:text-red-400 transition-colors duration-200"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                        <EyeIcon className="w-4 h-4" />
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
      <h2 className="text-2xl font-serif font-bold text-norelle-cream">Orders</h2>
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8 text-center">
        <p className="text-norelle-text-muted">Order management coming soon...</p>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-norelle-cream">Settings</h2>
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8 text-center">
        <p className="text-norelle-text-muted">Settings panel coming soon...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <div className="container-max section-padding">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
            Admin Dashboard
          </h1>
          <p className="text-norelle-text-muted">
            Manage your products, orders, and store settings
          </p>
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
            {activeTab === 'settings' && renderSettings()}
          </main>
        </div>
      </div>
    </div>
  )
}
