'use client'

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

interface NotionEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

/**
 * Custom image upload handler for admin posts
 * Uploads images to the 'posts' folder via the /api/upload endpoint
 */
const handleImageUpload = async (file: File): Promise<string> => {
  // API expects filename as query param and file as body
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  
  const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}&folder=posts`, {
    method: 'POST',
    body: file, // Send file directly as body
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Upload failed')
  }

  const data = await response.json()
  return data.url
}

/**
 * NotionEditor - A wrapper around SimpleEditor that provides controlled component behavior
 * This component uses the SimpleEditor template with a custom image upload handler
 * that uploads images to the 'posts' folder.
 */
export function NotionEditor({ value, onChange, placeholder = 'Start writing...' }: NotionEditorProps) {
  return (
    <SimpleEditor
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onImageUpload={handleImageUpload}
    />
  )
}
