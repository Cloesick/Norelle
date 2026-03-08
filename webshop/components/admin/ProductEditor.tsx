'use client'

import React, { useState } from 'react'
import { Product, Category } from '@/types'
import { categories } from '@/data/products'
import { 
  XMarkIcon, 
  PhotoIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

interface ProductEditorProps {
  product?: Product
  isOpen: boolean
  onClose: () => void
  onSave: (product: Partial<Product>) => void
}

export function ProductEditor({ product, isOpen, onClose, onSave }: ProductEditorProps) {
  const [formData, setFormData] = useState<Partial<Product>>(product || {
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: 0,
    salePrice: undefined,
    categories: [],
    tags: [],
    stock: 0,
    featured: false,
    rating: 0,
    reviewCount: 0,
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    materials: [],
    careInstructions: []
  })

  const [newTag, setNewTag] = useState('')
  const [newMaterial, setNewMaterial] = useState('')
  const [newCareInstruction, setNewCareInstruction] = useState('')

  const updateFormData = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      updateFormData('tags', [...(formData.tags || []), newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    updateFormData('tags', formData.tags?.filter(tag => tag !== tagToRemove))
  }

  const handleAddMaterial = () => {
    if (newMaterial.trim() && !formData.materials?.includes(newMaterial.trim())) {
      updateFormData('materials', [...(formData.materials || []), newMaterial.trim()])
      setNewMaterial('')
    }
  }

  const handleRemoveMaterial = (materialToRemove: string) => {
    updateFormData('materials', formData.materials?.filter(material => material !== materialToRemove))
  }

  const handleAddCareInstruction = () => {
    if (newCareInstruction.trim() && !formData.careInstructions?.includes(newCareInstruction.trim())) {
      updateFormData('careInstructions', [...(formData.careInstructions || []), newCareInstruction.trim()])
      setNewCareInstruction('')
    }
  }

  const handleRemoveCareInstruction = (instructionToRemove: string) => {
    updateFormData('careInstructions', formData.careInstructions?.filter(instruction => instruction !== instructionToRemove))
  }

  const handleCategoryToggle = (category: Category) => {
    const isSelected = formData.categories?.some(cat => cat.id === category.id)
    if (isSelected) {
      updateFormData('categories', formData.categories?.filter(cat => cat.id !== category.id))
    } else {
      updateFormData('categories', [...(formData.categories || []), category])
    }
  }

  const handleSave = () => {
    // Generate slug from name if not provided
    const slug = formData.slug || formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    onSave({
      ...formData,
      slug,
      id: product?.id || `product-${Date.now()}`,
      sku: formData.sku || `NOR-${Date.now().toString().slice(-6)}`,
      images: formData.images || [],
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-norelle-burgundy border border-norelle-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-norelle-border">
          <h2 className="text-xl font-serif font-bold text-norelle-cream">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-norelle-cream mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="input-field w-full"
                  placeholder="Product Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-norelle-cream mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => updateFormData('sku', e.target.value)}
                  className="input-field w-full"
                  placeholder="NOR-XXX-XXX"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-norelle-cream mb-2">
                  Short Description
                </label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => updateFormData('shortDescription', e.target.value)}
                  className="input-field w-full"
                  rows={2}
                  placeholder="Brief description for product cards"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-norelle-cream mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="input-field w-full"
                  rows={6}
                  placeholder="Detailed product description"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Categories</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.categories?.some(cat => cat.id === category.id)}
                    onChange={() => handleCategoryToggle(category)}
                    className="mr-2"
                  />
                  <span className="text-sm text-norelle-text-muted">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Pricing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-norelle-cream mb-2">
                  Regular Price *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateFormData('price', parseFloat(e.target.value))}
                  className="input-field w-full"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-norelle-cream mb-2">
                  Sale Price
                </label>
                <input
                  type="number"
                  value={formData.salePrice || ''}
                  onChange={(e) => updateFormData('salePrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="input-field w-full"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Inventory</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-norelle-cream mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => updateFormData('stock', parseInt(e.target.value))}
                  className="input-field w-full"
                  placeholder="0"
                  min="0"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => updateFormData('featured', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-norelle-text-muted">
                  Featured Product
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-norelle-burgundy-light border border-norelle-border text-norelle-cream"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-norelle-text-muted hover:text-red-400"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="input-field flex-1"
                placeholder="Add a tag"
              />
              <button
                onClick={handleAddTag}
                className="btn-secondary"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Materials */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Materials</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.materials?.map((material) => (
                <span
                  key={material}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-norelle-burgundy-light border border-norelle-border text-norelle-cream"
                >
                  {material}
                  <button
                    onClick={() => handleRemoveMaterial(material)}
                    className="ml-2 text-norelle-text-muted hover:text-red-400"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddMaterial()}
                className="input-field flex-1"
                placeholder="Add a material"
              />
              <button
                onClick={handleAddMaterial}
                className="btn-secondary"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Care Instructions */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Care Instructions</h3>
            <div className="space-y-2 mb-4">
              {formData.careInstructions?.map((instruction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-norelle-burgundy border border-norelle-border rounded">
                  <span className="text-sm text-norelle-text-muted">{instruction}</span>
                  <button
                    onClick={() => handleRemoveCareInstruction(instruction)}
                    className="text-norelle-text-muted hover:text-red-400"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCareInstruction}
                onChange={(e) => setNewCareInstruction(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCareInstruction()}
                className="input-field flex-1"
                placeholder="Add care instruction"
              />
              <button
                onClick={handleAddCareInstruction}
                className="btn-secondary"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-medium text-norelle-cream mb-4">Product Images</h3>
            <div className="border-2 border-dashed border-norelle-border rounded-lg p-8 text-center">
              <PhotoIcon className="w-12 h-12 text-norelle-text-muted mx-auto mb-4" />
              <p className="text-norelle-text-muted mb-4">
                Drag and drop images here, or click to select files
              </p>
              <button className="btn-secondary">
                Select Images
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-norelle-border">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            {product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  )
}
