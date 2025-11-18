'use client'

import { UploadDropzone } from '@/components/ui/upload-dropzone' // From shadcn
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export default function Import() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/import', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (res.ok) {
      toast.success('Data imported! Check your dashboard.')
    } else {
      toast.error(data.error)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="min-h-screen bg-vault py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-blood-500 bg-clip-text text-transparent">
          Import Your Data
        </h1>
        <p className="text-xl text-gray-300 mb-12">Drag Whoop CSV, Apple XML, Garmin FIT, or Oura JSON here.</p>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-blood-600 rounded-2xl p-20 text-center cursor-pointer hover:border-blood-500 transition-colors",
            isDragActive && "bg-blood-900/20"
          )}
        >
          <input {...getInputProps()} />
          <p className="text-2xl">Drop your file here</p>
        </div>
      </div>
    </div>
  )
}
