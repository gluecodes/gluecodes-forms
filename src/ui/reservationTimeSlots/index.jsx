import styles from './styles.css'

export default ({
  availableTimeSlots,
  summary,
  onPartOfDayChanged,
  onTimeSlotChanged,
  selectedPartOfDay,
  selectedTimeSlot = {},
  timeOfDayChoice
}) => (
  <div className={styles.timeSlotWrapper}>
    <p className={styles.summary}>{summary}</p>
    <div className={styles.timeOfDayChoiceWrapper}>
      <p className={styles.timeOfDayText}>{timeOfDayChoice.explanationText}</p>
      {
        timeOfDayChoice.options.length > 1 ? (
          <select
            className={styles.timeOfDaySelect}
            onchange={(e) => onPartOfDayChanged(e.target.value)}>
            {
              timeOfDayChoice.options.map(option => (
                <option
                  selected={option.id === selectedPartOfDay}
                  className={styles.timeOfDayOption}
                  value={option.id}>
                  {option.name}
                </option>
              ))
            }
          </select>
        ) : null
      }
    </div>
    <div className={styles.availableHoursWrapper}>
      {
        availableTimeSlots.map(timeSlot => (
          <button
            className={`${styles.availableHourButton}
            ${timeSlot.hours === selectedTimeSlot.hours && timeSlot.minutes === selectedTimeSlot.minutes ? styles.activeTimeSlot : ''}`}
            onclick={() => onTimeSlotChanged(timeSlot)}>{timeSlot.name}
          </button>
        ))
      }
    </div>
  </div>
)
