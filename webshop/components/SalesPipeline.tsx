'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { 
  EyeIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  CreditCardIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline'
import { SalesPipelineStage } from '@/types'

interface SalesPipelineProps {
  currentStage?: SalesPipelineStage
}

const pipelineStages = [
  { 
    key: 'discover' as SalesPipelineStage, 
    label: 'Discover', 
    icon: EyeIcon,
    paths: ['/', '/shop', '/category']
  },
  { 
    key: 'choose' as SalesPipelineStage, 
    label: 'Choose', 
    icon: ShoppingBagIcon,
    paths: ['/product']
  },
  { 
    key: 'overview' as SalesPipelineStage, 
    label: 'Overview', 
    icon: ShoppingCartIcon,
    paths: ['/cart']
  },
  { 
    key: 'payment' as SalesPipelineStage, 
    label: 'Payment', 
    icon: CreditCardIcon,
    paths: ['/checkout']
  },
  { 
    key: 'confirmed' as SalesPipelineStage, 
    label: 'Confirmed', 
    icon: CheckCircleIcon,
    paths: ['/order-success', '/thank-you']
  },
]

export function SalesPipeline({ currentStage }: SalesPipelineProps) {
  const pathname = usePathname()
  
  // Auto-detect current stage based on pathname if not provided
  const detectedStage = React.useMemo(() => {
    if (currentStage) return currentStage
    
    for (const stage of pipelineStages) {
      if (stage.paths.some(path => pathname.startsWith(path))) {
        return stage.key
      }
    }
    return null
  }, [currentStage, pathname])

  // Only show pipeline if we're in a shopping flow (not on homepage or static pages)
  const shouldShow = detectedStage && detectedStage !== 'discover'

  if (!shouldShow) return null

  const currentStageIndex = pipelineStages.findIndex(stage => stage.key === detectedStage)

  return (
    <div className="sales-pipeline">
      {pipelineStages.map((stage, index) => {
        const Icon = stage.icon
        const isActive = index === currentStageIndex
        const isCompleted = index < currentStageIndex
        const isInactive = index > currentStageIndex

        return (
          <div key={stage.key} className={`pipeline-step ${isActive ? 'active' : isCompleted ? 'completed' : 'inactive'}`}>
            <div className="pipeline-icon">
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-xs md:text-sm mt-2 font-medium">
              {stage.label}
            </span>
            {index < pipelineStages.length - 1 && (
              <div className={`hidden md:block flex-1 h-0.5 mx-2 ${
                isCompleted ? 'bg-green-400' : 'bg-norelle-border'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
