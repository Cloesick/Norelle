'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ShoppingBagIcon,
  ChartBarIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  TrophyIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function SalespersonDashboard() {
  const router = useRouter()
  const [salesperson, setSalesperson] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'tasks' | 'performance'>('overview')

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('norell_admin_session')
    if (!session) {
      router.push('/admin/login')
      return
    }

    const sessionData = JSON.parse(session)
    if (sessionData.type !== 'salesperson') {
      router.push('/admin/login')
      return
    }

    setSalesperson(sessionData)
  }, [router])

  // Mock data for salesperson
  const personalStats = {
    salesToday: 1250,
    salesMTD: 15420,
    salesYTD: 67890,
    commissionEarned: 2345,
    customersHelped: 47,
    conversionRate: 12.5
  }

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', sales: 23450, commission: 3517 },
    { rank: 2, name: 'Michael Chen', sales: 19800, commission: 2970 },
    { rank: 3, name: 'You', sales: 15420, commission: 2345, isCurrentUser: true },
    { rank: 4, name: 'Emma Wilson', sales: 14200, commission: 2130 },
    { rank: 5, name: 'James Brown', sales: 12800, commission: 1920 }
  ]

  const recentCustomers = [
    { id: 1, name: 'Alexandra Dubois', email: 'alexandra@email.com', phone: '+32 2 123 4567', lastContact: '2 hours ago', status: 'hot-lead' },
    { id: 2, name: 'Nicolas Bernard', email: 'bernard@email.com', phone: '+32 2 234 5678', lastContact: '1 day ago', status: 'follow-up' },
    { id: 3, name: 'Sophie Martin', email: 'sophie@email.com', phone: '+32 2 345 6789', lastContact: '3 days ago', status: 'new' },
    { id: 4, name: 'Thomas Laurent', email: 'thomas@email.com', phone: '+32 2 456 7890', lastContact: '1 week ago', status: 'cold-lead' }
  ]

  const upcomingTasks = [
    { id: 1, title: 'Follow up with Alexandra', type: 'call', due: 'Today, 2:00 PM', priority: 'high' },
    { id: 2, title: 'Product demo for Nicolas', type: 'meeting', due: 'Tomorrow, 10:00 AM', priority: 'medium' },
    { id: 3, title: 'Send catalog to Sophie', type: 'email', due: 'Tomorrow, 3:00 PM', priority: 'low' },
    { id: 4, title: 'Weekly sales meeting', type: 'meeting', due: 'Friday, 9:00 AM', priority: 'medium' }
  ]

  const achievements = [
    { id: 1, name: 'Top Performer', description: 'Best sales this month', icon: TrophyIcon, earned: true },
    { id: 2, name: 'Customer Champion', description: '100% satisfaction rate', icon: StarIcon, earned: true },
    { id: 3, name: 'Rising Star', description: '10 sales in one day', icon: ChartBarIcon, earned: false },
    { id: 4, name: 'Relationship Builder', description: '50 repeat customers', icon: UserGroupIcon, earned: false }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'customers', label: 'Customers', icon: UserGroupIcon },
    { id: 'tasks', label: 'Tasks', icon: CalendarIcon },
    { id: 'performance', label: 'Performance', icon: TrophyIcon }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot-lead': return 'bg-red-900/20 text-red-400 border border-red-800/30'
      case 'follow-up': return 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30'
      case 'new': return 'bg-green-900/20 text-green-400 border border-green-800/30'
      case 'cold-lead': return 'bg-blue-900/20 text-blue-400 border border-blue-800/30'
      default: return 'bg-gray-900/20 text-gray-400 border border-gray-800/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Today's Sales</span>
            <CurrencyDollarIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">€{personalStats.salesToday.toLocaleString()}</div>
          <div className="text-sm text-green-400">+15% from yesterday</div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Commission Earned</span>
            <TrophyIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">€{personalStats.commissionEarned.toLocaleString()}</div>
          <div className="text-sm text-green-400">This month</div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-norelle-text-muted">Conversion Rate</span>
            <ChartBarIcon className="w-5 h-5 text-norelle-text-muted" />
          </div>
          <div className="text-2xl font-bold text-norelle-cream">{personalStats.conversionRate}%</div>
          <div className="text-sm text-orange-400">-2% from last week</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
        <h2 className="text-xl font-serif font-bold text-norelle-cream mb-4">Sales Leaderboard</h2>
        <div className="space-y-3">
          {leaderboard.map((person) => (
            <div 
              key={person.rank} 
              className={`flex items-center justify-between p-3 rounded-lg ${
                person.isCurrentUser ? 'bg-norelle-burgundy/50 border border-norelle-cream/30' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  person.rank <= 3 ? 'bg-norelle-cream text-norelle-burgundy' : 'bg-norelle-burgundy text-norelle-cream'
                }`}>
                  {person.rank}
                </div>
                <div>
                  <div className="text-norelle-cream font-medium">
                    {person.name}
                    {person.isCurrentUser && <span className="ml-2 text-xs text-norelle-text-muted">(You)</span>}
                  </div>
                  <div className="text-sm text-norelle-text-muted">€{person.sales.toLocaleString()} sales</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-norelle-cream font-medium">€{person.commission.toLocaleString()}</div>
                <div className="text-sm text-norelle-text-muted">commission</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <h2 className="text-xl font-serif font-bold text-norelle-cream mb-4">Recent Customers</h2>
          <div className="space-y-3">
            {recentCustomers.slice(0, 3).map((customer) => (
              <div key={customer.id} className="flex items-center justify-between">
                <div>
                  <div className="text-norelle-cream font-medium">{customer.name}</div>
                  <div className="text-sm text-norelle-text-muted">{customer.lastContact}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.status)}`}>
                  {customer.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
          <h2 className="text-xl font-serif font-bold text-norelle-cream mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            {upcomingTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div>
                  <div className="text-norelle-cream font-medium">{task.title}</div>
                  <div className="text-sm text-norelle-text-muted">{task.due}</div>
                </div>
                <ClockIcon className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-norelle-cream">Customer Management</h2>
        <button className="btn-primary inline-flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-norelle-border">
                <th className="text-left py-3 px-4 text-norelle-text-muted">Customer</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Contact</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Last Contact</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Status</th>
                <th className="text-left py-3 px-4 text-norelle-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-norelle-border/50">
                  <td className="py-3 px-4">
                    <div className="text-norelle-cream font-medium">{customer.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-norelle-text-muted">
                        <EnvelopeIcon className="w-4 h-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-norelle-text-muted">
                        <PhoneIcon className="w-4 h-4" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-norelle-text-muted">{customer.lastContact}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                        <PhoneIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                        <EnvelopeIcon className="w-4 h-4" />
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

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-norelle-cream">Tasks & Schedule</h2>
        <button className="btn-primary inline-flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-norelle-burgundy/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority).replace('text-', 'bg-')}`} />
                <div>
                  <div className="text-norelle-cream font-medium">{task.title}</div>
                  <div className="text-sm text-norelle-text-muted">{task.due}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(task.priority)} bg-norelle-burgundy/50`}>
                  {task.priority}
                </span>
                <button className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200">
                  <CheckCircleIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-norelle-cream">Performance & Achievements</h2>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-norelle-cream">€{personalStats.salesMTD.toLocaleString()}</div>
          <div className="text-sm text-norelle-text-muted">Month to Date</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-norelle-cream">€{personalStats.salesYTD.toLocaleString()}</div>
          <div className="text-sm text-norelle-text-muted">Year to Date</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-norelle-cream">{personalStats.customersHelped}</div>
          <div className="text-sm text-norelle-text-muted">Customers Helped</div>
        </div>
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-norelle-cream">#{leaderboard.find(p => p.isCurrentUser)?.rank}</div>
          <div className="text-sm text-norelle-text-muted">Current Rank</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
        <h3 className="text-xl font-serif font-bold text-norelle-cream mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div 
                key={achievement.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-norelle-burgundy/50 border-norelle-cream/30' 
                    : 'bg-norelle-burgundy/20 border-norelle-border/50 opacity-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-norelle-cream text-norelle-burgundy' : 'bg-norelle-burgundy text-norelle-cream'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-norelle-cream font-medium">{achievement.name}</div>
                  <div className="text-sm text-norelle-text-muted">{achievement.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  if (!salesperson) {
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
                Sales Dashboard
              </h1>
              <p className="text-norelle-text-muted">
                Welcome back, {salesperson.name}! Here's your sales overview.
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
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'customers' && renderCustomers()}
            {activeTab === 'tasks' && renderTasks()}
            {activeTab === 'performance' && renderPerformance()}
          </main>
        </div>
      </div>
    </div>
  )
}
