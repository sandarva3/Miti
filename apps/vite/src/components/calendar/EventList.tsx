import React from 'react'
import UpcomingEvent from './UpcomingEvent'

interface Event {
  date: string
  day: string
  title: string
  daysLeft: number
  fullDate: string
}

const EventList: React.FC<{
  events: Event[]
  isHoliday?: boolean
  title?: string
}> = ({ events, isHoliday, title }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">{title}</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <UpcomingEvent key={index} event={event} isHoliday={isHoliday} />
        ))}
      </div>
    </div>
  )
}

export default EventList
