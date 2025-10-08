'use client'

import { message } from 'antd'

export const imageHandler = function(this: any) {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()

  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return

    // Validate file size (max 5MB)
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!')
      return
    }

    try {
      // Show loading message
      const hide = message.loading('Uploading image...', 0)
      
      // Create a unique filename
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name}`
      
      // Upload to Vercel Blob
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: file,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const blob = await response.json()
      
      // Insert image into editor
      const quill = this.quill
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'image', blob.url)
      quill.setSelection(range.index + 1)
      
      hide()
      message.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      message.error('Failed to upload image')
    }
  }
}

export const quillModules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
    handlers: {
      image: imageHandler
    }
  },
}

export const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'blockquote', 'code-block',
  'link', 'image', 'video',
  'color', 'background',
  'align'
]
