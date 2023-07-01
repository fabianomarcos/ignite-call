import { useState } from 'react'
import { CalendarStep } from './calendarStep'
import { ConfirmStep } from './confirmStep'

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  const handleClearSelectedDateTime = () => setSelectedDateTime(null)

  const confirmStepComponent = (
    <ConfirmStep
      schedulingDate={selectedDateTime as Date}
      onCancelConfirmation={handleClearSelectedDateTime}
    />
  )

  const calendarStepComponent = (
    <CalendarStep onSelectDateTime={setSelectedDateTime} />
  )

  return selectedDateTime ? confirmStepComponent : calendarStepComponent
}
