
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { FC, useCallback, useMemo, useState } from 'react'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})



const events = [
    {
      id: 0,
      title: 'Board meeting',
      start: new Date(2022, 0, 29, 9, 0, 0),
      end: new Date(2022, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: 'MS training',
      allDay: true,
      start: new Date(2022, 0, 29, 14, 0, 0),
      end: new Date(2022, 0, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: 'Team lead meeting',
      start: new Date(2022, 0, 29, 8, 30, 0),
      end: new Date(2022, 0, 29, 12, 30, 0),
      resourceId: 3,
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2022, 0, 30, 7, 0, 0),
      end: new Date(2022, 0, 30, 10, 30, 0),
      resourceId: 4,
    },
  ]

export const WorkCalendar:FC = (props:any) => { 
    const [myEvents, setEvents] = useState(events)

    const handleSelectSlot = useCallback(
      ({ start, end }) => {
        const title = window.prompt('New Event Name')
        if (title) {
          setEvents((prev) => [...prev, { start, end, title } as any])
        }
      },
      [setEvents]
    )
  
    const handleSelectEvent = useCallback(
      (event) => window.alert(event.title),
      []
    )
  
    const { defaultDate, scrollToTime } = useMemo(
      () => ({
        defaultDate: new Date(),
        scrollToTime: new Date(1970, 1, 1, 6),
      }),
      []
    )
    const dayLayoutAlgorithm = "no-overlap";
  
    
   return (
  <div>
    <Calendar
       dayLayoutAlgorithm={dayLayoutAlgorithm}    
       defaultDate={defaultDate}
       defaultView={Views.MONTH}
       events={myEvents}
       localizer={localizer}
       onSelectEvent={handleSelectEvent}
       onSelectSlot={handleSelectSlot}
       selectable
       scrollToTime={scrollToTime}
       style={{ height: 800 }}
    />
  </div>
)}