import React, { useState } from 'react'
import { classNames } from '../../helper/utils'
import Panchang from './Panchang'

const Today = ({ isHoliday = true }: { isHoliday: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className=" bg-white shadow-md flex-row items-center border rounded-lg p-4">
      {/* Top Section */}
      <div className="flex items-center space-x-4 rounded-lg">
        <div className="bg-gray-200 rounded-lg text-center w-16 h-16 flex flex-col gap-1 items-center justify-center">
          <div>
            <p className="text-2xl font-semibold text-gray-700">१२</p>
            <p className="text-sm font-semibold text-gray-700">सोम</p>
          </div>
        </div>
        <div className="flex-1">
          <span className="flex flex-row">
            <p className="font-bold text-left flex-1 text-2xl">कार्तिक, २०८१</p>
          </span>
          <p className="text-sm text-gray-600">तृतीया, कार्तिक कृष्णपक्ष</p>

          <p className="text-xs text-gray-500">ने.सं. ११४४, कौलागा</p>
        </div>
      </div>

      <div className="flex my-4 justify-between">
        <img
          src="https://img.icons8.com/color/48/000000/sunrise.png"
          alt="sunrise"
          className="h-6 w-6"
        />
        <p className="text-sm text-gray-600">सूर्योदय: १७:३९</p>

        <img
          src="https://img.icons8.com/color/48/000000/sunset.png"
          alt="sunrise"
          className="h-6 w-6"
        />
        <p className="text-sm text-gray-600">सूर्यास्त: १७:३९</p>
      </div>
      <div className="flex justify-end">
        <button
          className="text-sm rounded-lg flex-1 items-end text-end transition-all duration-300 text-indigo-500 hover:text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          आजको पंचांग <span className="text-xs">{isOpen ? '^' : '⌄'}</span>
        </button>
      </div>
      {isOpen && <Panchang />}
    </div>
  )
}

export default Today
