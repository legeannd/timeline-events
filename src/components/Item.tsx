import React, { useState } from "react"
import { format, parseISO, differenceInDays } from "date-fns"

export default function Item({ item, startDate, daysInTimeline, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)

  const getItemStyle = () => {
    const itemStart = parseISO(item.start)
    const itemEnd = parseISO(item.end)

    const startOffset = differenceInDays(itemStart, startDate)
    const duration = differenceInDays(itemEnd, itemStart) + 1

    const left = (startOffset / daysInTimeline) * 100
    const width = (duration / daysInTimeline) * 100

    return {
      left: `${left}%`,
      width: `${width}%`,
    }
  }

  const getItemColor = () => {
    const colors = [
      "bg-blue-500 hover:bg-blue-600",
      "bg-red-500 hover:bg-red-600",
      "bg-green-500 hover:bg-green-600",
      "bg-amber-500 hover:bg-amber-600",
      "bg-violet-500 hover:bg-violet-600",
      "bg-pink-500 hover:bg-pink-600",
      "bg-cyan-500 hover:bg-cyan-600",
      "bg-orange-500 hover:bg-orange-600",
    ]

    return colors[(item.id - 1) % colors.length]
  }

  const handleNameChange = (e) => {
    onUpdate({ ...item, name: e.target.value })
  }

  const handleEditComplete = () => {
    setIsEditing(false)
  }

  const dateRangeText = `${format(parseISO(item.start), "MMM d, yyyy")} - ${format(parseISO(item.end), "MMM d, yyyy")}`

  return (
    <div
      className={`absolute h-8 rounded text-white text-xs flex items-center overflow-hidden cursor-pointer shadow-sm transition-colors ${getItemColor()}`}
      style={{...getItemStyle(), width: isEditing ? '300px' : getItemStyle().width, zIndex: isEditing? 10 : 1}}
      title={`${item.name} (${dateRangeText})`}
    >

      {isEditing ? (
        <input
          type="text"
          value={item.name}
          onChange={handleNameChange}
          onBlur={handleEditComplete}
          autoFocus
          className="w-[calc(100%-16px)] border-none bg-black p-2 text-white outline-none text-xs"
        />
      ) : (
        <div
          className="px-2 whitespace-nowrap overflow-hidden text-ellipsis flex-1"
          onDoubleClick={() => setIsEditing(true)}
        >
          {item.name}
        </div>
      )}
    </div>
  )
}

