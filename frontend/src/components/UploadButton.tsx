import React, { useRef, useState } from 'react'

interface UploadButtonProps {
  onFileUpload: (file: File) => void
  onDatabaseSelect?: (database: string) => void
  disabled?: boolean
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileUpload,onDatabaseSelect, disabled }) => {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
    // Database options
  const databases = [
    'Database 1',
    'Database 2'
  ]
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5 MB')
        return
      }
      if ( file.name.endsWith('.csv')) {
        setFileName(file.name)
        onFileUpload(file)
      } else {
        alert('Please select a valid .csv file')
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleClick = () => {
    triggerFileInput()
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleDatabaseSelect = (database: string) => {
    setSelectedDatabase(database)
    setIsDropdownOpen(false)
    onDatabaseSelect?.(database)
  }

 return (
    <div className='fixed top-4 right-4 z-50 flex flex-col gap-2'>
      {/* Upload Button */}
      <div>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          name='file'
          accept='.csv'
          className='hidden'
        />
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors duration-300 w-full ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {fileName ? (disabled ? `Uploading: ${fileName}` : `Uploaded: ${fileName}`) : 'Upload CSV'}
        </button>
      </div>

      {/* Database Dropdown */}
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          disabled={disabled}
          className={`px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors duration-300 w-full flex items-center justify-between ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span>
            {selectedDatabase ? selectedDatabase : 'Databases (2)'}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && !disabled && (
          <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10'>
            {databases.map((database, index) => (
              <button
                key={index}
                
                className='w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 first:rounded-t last:rounded-b'
              >
                {database}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
  


export default UploadButton
