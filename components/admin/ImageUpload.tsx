'use client'

import { useState } from 'react'
import { Upload, message, Button } from 'antd'
import { UploadOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange?: (url: string) => void
  label?: string
  accept?: string
  folder?: string // Folder to organize uploads: 'covers', 'content', 'seo', etc.
}

export function ImageUpload({ value, onChange, label = 'Upload Image', accept = 'image/*', folder = 'general' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(value || '')

  const handleUpload = async (file: File) => {
    try {
      setUploading(true)
      
      // Create a unique filename
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name}`
      
      // Upload to Vercel Blob with folder organization
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}&folder=${encodeURIComponent(folder)}`, {
        method: 'POST',
        body: file,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const blob = await response.json()
      setImageUrl(blob.url)
      onChange?.(blob.url)
      message.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      message.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const uploadProps: UploadProps = {
    accept,
    showUploadList: false,
    beforeUpload: (file) => {
      // Validate file size (max 5MB)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!')
        return false
      }

      handleUpload(file)
      return false // Prevent default upload behavior
    },
  }

  const handleRemove = () => {
    setImageUrl('')
    onChange?.('')
    message.success('Image removed')
  }

  return (
    <div>
      {imageUrl ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Image
            src={imageUrl}
            alt="Uploaded"
            width={200}
            height={200}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} disabled={uploading}>
                Change Image
              </Button>
            </Upload>
            <Button 
              icon={<DeleteOutlined />} 
              danger 
              onClick={handleRemove}
              disabled={uploading}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Upload {...uploadProps}>
          <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} disabled={uploading}>
            {uploading ? 'Uploading...' : label}
          </Button>
        </Upload>
      )}
      {imageUrl && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            View full size
          </a>
        </div>
      )}
    </div>
  )
}
