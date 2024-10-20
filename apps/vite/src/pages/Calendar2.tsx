import React from 'react'
import CalendarHeader from '../components/calendar/CalendarHeader'
import CalendarGrid from '../components/calendar/CalendarGrid'
import EventList from '../components/calendar/EventList'
import Today from '../components/calendar/Today'
import Debugger from '../components/Debugger'
import CurrencyConverterCard from '../components/extras/CurrencyConverterCard'
import DateConverter from '../components/extras/DateConverter'
import MetalPrice from '../components/extras/MetalPrice'

const Calendar2 = () => {
  const events = [
    {
      date: '१२',
      day: 'सोम',
      title: 'रमा एकादशी व्रत',
      daysLeft: 8,
      fullDate: 'कार्तिक १२, २०८१ | Oct 28, 2024',
    },

    {
      date: '१२',
      day: 'सोम',
      title: 'रमा एकादशी व्रत',
      daysLeft: 8,
      fullDate: 'कार्तिक १२, २०८१ | Oct 28, 2024',
    },
    {
      date: '१२',
      day: 'सोम',
      title: 'रमा एकादशी व्रत',
      daysLeft: 8,
      fullDate: 'कार्तिक १२, २०८१ | Oct 28, 2024',
    },
    // Add more events as needed
  ]
  //   console.log(fetchGoldSilverRates())
  return (
    <section className="relative bg-stone-50 text-sm">
      <Debugger />
      <div className="w-full relative">
        <div className="w-full px-2 py-2 mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col gap-4 order-2 sm:order-1 flex-wrap md:flex-nowrap">
              <Today isHoliday={false} />
              <EventList events={events} title="आजको इभेन्टहरू" />
            </div>

            <div className="order-1 sm:order-2 px-2.5 py-5 flex-1 sm:p-4 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
              <CalendarHeader month="January" year="2024" />
              <CalendarGrid />
            </div>
            <div className="flex flex-col gap-4 order-3 ">
              <EventList events={events} title="आगामी इभेन्टहरु" />
              <EventList events={events} title="आगामी बिदाहरु" isHoliday={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <MetalPrice />
        <CurrencyConverterCard
          initialAmount={1}
          exchangeRate={134.21}
          fromCurrency="USD"
          toCurrency="NPR"
        />
        <DateConverter />
      </div>
    </section>
  )
}

export default Calendar2
