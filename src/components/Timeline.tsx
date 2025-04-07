import React, { useState, useMemo, useCallback } from "react"
import {
  format,
  parseISO,
  differenceInDays,
  addMonths,
  startOfMonth,
} from "date-fns"
import { assignLanes } from "../lib/assignLanes.ts"
import Item from './Item.tsx'

export function Timeline({ items: initialItems }) {
  const [scale, setScale] = useState(1)
  const [timelineItems, setTimelineItems] = useState(initialItems)

  const { startDate, endDate, lanes, daysInTimeline } = useMemo(() => {
    const sortedByStart = [...timelineItems].sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime())
    const sortedByEnd = [...timelineItems].sort((a, b) => parseISO(b.end).getTime() - parseISO(a.end).getTime())

    const startDate = parseISO(sortedByStart[0].start)
    const endDate = parseISO(sortedByEnd[0].end)
    const daysInTimeline = differenceInDays(endDate, startDate) + 1
    const lanes = assignLanes(timelineItems)

    return { startDate, endDate, lanes, daysInTimeline }
  }, [timelineItems])

  const monthLabels = useMemo(() => {
    const labels: { date: Date; position: number; label: string }[] = []
    let currentDate = startOfMonth(startDate)

    while (currentDate <= endDate) {
      const daysSinceStart = differenceInDays(currentDate, startDate)
      const position = (daysSinceStart / daysInTimeline) * 100

      labels.push({
        date: currentDate,
        position: position >= 0 ? position : 0, 
        label: format(currentDate, "MMM yyyy"),
      })

      currentDate = addMonths(currentDate, 1)
    }

    return labels
  }, [startDate, endDate, daysInTimeline])

  const handleZoom = (direction) => {
    setScale((prevScale) => {
      const newScale = direction === "in" ? prevScale * 1.2 : prevScale / 1.2
      return Math.min(Math.max(newScale, 0.5), 3)
    })
  }

  const handleItemUpdate = useCallback((updatedItem) => {
    setTimelineItems((prevItems) => prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }, [])


  return (
    <div className="flex flex-col w-full my-5">
      <div className="flex items-center mb-3 gap-3">
        <button
          onClick={() => handleZoom("out")}
          className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-lg transition-colors"
        >
          -
        </button>
        <span className="text-sm text-gray-600">Zoom: {Math.round(scale * 100)}%</span>
        <button
          onClick={() => handleZoom("in")}
          className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-lg transition-colors"
        >
          +
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-md relative">
        <div
          className="relative min-h-[300px] pt-8 pb-5 timeline-content"
          style={{
            width: `${100 * scale}%`,
            minWidth: "100%",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-50 border-b border-gray-300">
            {monthLabels.map((month, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 text-center text-xs text-gray-600 flex flex-col items-center"
                style={{ left: `${month.position}%` }}
              >
                <div className="absolute h-[300px] w-px bg-gray-200 top-8"></div>
                <span>{month.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            {lanes.map((lane, laneIndex) => (
              <div key={laneIndex} className="relative h-10 mb-3 bg-gray-50/70">
                {lane.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    startDate={startDate}
                    daysInTimeline={daysInTimeline}
                    onUpdate={handleItemUpdate}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-1.5"></div>
          <span>Timeline Items</span>
        </div>
        <div className="text-right leading-tight">
          <p>• Double-click item text to edit name</p>
          <p>• Use +/- buttons to zoom</p>
        </div>
      </div>
    </div>
  )
}

