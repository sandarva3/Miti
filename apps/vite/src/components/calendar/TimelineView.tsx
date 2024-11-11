import { NewCalendarData } from "@miti/types"
import React from "react"

type TimelineViewProps = {
  monthData: NewCalendarData[]
}

const TimelineView = ({ monthData }: TimelineViewProps) => {
  return <div className="rounded-xl overflow-y-auto"></div>
}

export default TimelineView
