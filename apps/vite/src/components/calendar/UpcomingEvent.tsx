import React from 'react'
import { classNames } from '../../helper/utils'

interface Event {
  date: string
  day: string
  title: string
  daysLeft: number
  fullDate: string
}

const UpcomingEvent: React.FC<{ event: Event; isHoliday?: boolean }> = ({ event, isHoliday }) => {
  return (
    <div className="flex items-center space-x-4 border rounded-lg p-2 ">
      <div
        className={classNames(
          'rounded-lg text-center w-12 h-12 flex-row items-center justify-center',
          isHoliday ? 'text-red-500 bg-red-50' : 'text-gray-700 bg-gray-200 '
        )}
      >
        <p className="text-lg font-semibold">{event.date}</p>
        <p className="text-xs font-semibold">{event.day}</p>
      </div>
      <div className="flex-1">
        <span className="flex flex-row">
          <p
            className={classNames(
              'font-bold text-left flex-1',
              isHoliday ? 'text-red-500' : 'text-gray-700'
            )}
          >
            {event.title}
          </p>
          <p className="text-xs text-gray-500 text-right bg-gray-100 rounded-xl px-1 py-[0.1rem]">
            {event.daysLeft} दिन बाँकी
          </p>
        </span>
        <p className="text-xs text-gray-500">{event.fullDate}</p>
      </div>
    </div>
  )
}

export default UpcomingEvent
