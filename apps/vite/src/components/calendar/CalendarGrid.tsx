import React from 'react'

const CalendarGrid: React.FC = () => {
  return (
    <div className="border border-indigo-200 rounded-xl">
      <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 rounded-b-xl">
        {Array(35)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer relative"
            >
              <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between">
                  <p className="text-xs text-gray-900">{index + 1}</p>
                  <p className="text-xs text-gray-900 hidden xl:block">पूर्णिमा</p>
                </div>
                <p className="flex-1 flex w-full text-xl text-center font-semibold text-gray-900 justify-center items-center my-auto line-clamp-1">
                  {index + 1}
                </p>
                <p className="text-xs text-gray-900 text-center hidden xl:block">रमा एकादशी व्रत</p>
              </div>

              {index % 3 === 0 && (
                <div className="absolute bottom-1 p-1.5 h-max rounded xl:bg-emerald-50 z-10 flex-row">
                  <p className="hidden xl:block text-xs font-medium text-emerald-600 mb-px whitespace-nowrap">
                    Developer Meetup
                  </p>
                  <p className="xl:hidden w-2 h-2 rounded-full bg-emerald-600" />
                  <p className="hidden xl:block text-xs font-medium text-emerald-600 mb-px whitespace-nowrap">
                    Developer Meetup
                  </p>
                  <p className="xl:hidden w-2 h-2 rounded-full bg-emerald-600" />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default CalendarGrid
