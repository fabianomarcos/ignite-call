import { useState } from 'react'
import { CalendarStep } from './calendarStep'
import { ConfirmStep } from './confirmStep'

interface IProps {
  handleToggleLoader: (state: boolean) => void
}

export function ScheduleForm({ handleToggleLoader }: IProps) {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  const handleClearSelectedDateTime = () => setSelectedDateTime(null)

  const confirmStepComponent = (
    <ConfirmStep
      schedulingDate={selectedDateTime as Date}
      onCancelConfirmation={handleClearSelectedDateTime}
    />
  )

  const calendarStepComponent = (
    <CalendarStep
      handleToggleLoader={handleToggleLoader}
      onSelectDateTime={setSelectedDateTime}
    />
  )

  return selectedDateTime ? confirmStepComponent : calendarStepComponent
}
