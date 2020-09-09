import externalStyles from '@app/styles'
import fa from '@app/fa'
import styles from './styles.css'

const isDateInPast = ({ day, month, year, currentDate }) => {
  return year === currentDate.getFullYear() && month === currentDate.getMonth() && (!day || (day && day < currentDate.getDate()))
}

const isDateInFuture = ({ year, month, lastYear }) => {
  return year === lastYear && month === 11
}

const isDateInDisabledList = ({ disabledDates, day, month, year }) => (
  disabledDates.some(disabledDate => (day === disabledDate.day && month === disabledDate.month && year === disabledDate.year))
)

const shouldDisableDate = (...args) => (
  isDateInPast(...args) || isDateInDisabledList(...args)
)

const getFirstDayOfMonth = (month, year) => (new Date(year, month)).getDay()
const getNumOfDaysInMonth = (month, year) => (32 - new Date(year, month, 32).getDate())

const buildCalendarBody = ({
  currentDate,
  disabledDates,
  onDateChanged,
  onDateUnavailable = () => {},
  selectedDay,
  selectedMonth,
  selectedYear
}) => {
  let day = 1
  return Array(6).fill(0).map((...[, i]) => (
    <tr>
      {
        (() => {
          const cols = []

          for (let j = 0; j < 7; j++) {
            if (day > getNumOfDaysInMonth(selectedMonth, selectedYear)) {
              break
            }

            if (i === 0 && j < getFirstDayOfMonth(selectedMonth, selectedYear)) {
              cols.push(<td/>)
            } else {
              const isDayToday = day === currentDate.getDate() &&
                selectedYear === currentDate.getFullYear() &&
                selectedMonth === currentDate.getMonth()

              cols.push((
                <td
                  attributes={{ 'data-value': day }}
                  className={`${styles.dayCell} ${isDayToday ? styles.currentDate : ''} ${day === selectedDay ? styles.active : ''} ${shouldDisableDate({ disabledDates, day, month: selectedMonth, year: selectedYear, currentDate }) ? styles.disabledDate : ''}`}
                  onclick={(e) => {
                    if (!e.target.classList.contains(...styles.disabledDate.split(' '))) {
                      onDateChanged({ day: +e.target.dataset.value, month: selectedMonth, year: selectedYear })
                    } else {
                      onDateUnavailable({ day: +e.target.dataset.value, month: selectedMonth, year: selectedYear })
                    }
                  }}>{day}</td>
              ))
              day += 1
            }
          }

          return cols
        })()
      }
    </tr>
  ))
}

export default ({
  currentDate,
  daysOfWeek,
  disabledDates,
  months,
  onDateChanged,
  onDateUnavailable,
  selectedDay,
  selectedMonth,
  selectedYear,
  lastYear
}) => (
  <div className={`${styles.calendar} ${externalStyles['text-center']}`}>
    <div className={styles.monthSelector}>
      <a href='#'
        className={`${styles.arrow} ${styles.prev}`}
        onclick={(e) => {
          e.preventDefault()
          if (isDateInPast({ month: selectedMonth, year: selectedYear, currentDate })) {
            return
          }
          onDateChanged({
            day: null,
            month: (selectedMonth - 1) < 0 ? 11 : (selectedMonth - 1),
            year: (selectedMonth - 1) < 0 ? (selectedYear) - 1 : selectedYear
          })
        }}><i className={`${fa.fas} ${fa['fa-chevron-left']}`}/></a>
      <h5 className={styles.headline}>{`${months[selectedMonth]} ${selectedYear}`}</h5>
      <a href='#'
        className={`${styles.arrow} ${styles.next}`} onclick={(e) => {
          e.preventDefault()
          if (isDateInFuture({ year: selectedYear + 1, month: selectedMonth, lastYear })) {
            return
          }
          onDateChanged({
            day: null,
            month: (selectedMonth + 1) > 11 ? 0 : (selectedMonth + 1),
            year: (selectedMonth + 1) > 11 ? (selectedYear + 1) : selectedYear
          })
        }}><i className={`${fa.fas} ${fa['fa-chevron-right']}`}/></a>
    </div>
    <table className={`${styles.calendarTable}`}>
      <thead>
        <tr>
          {
            daysOfWeek.map(day => (
              <th className={`${styles.topRowCell}`}>{day}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          buildCalendarBody({
            currentDate,
            disabledDates,
            onDateChanged,
            onDateUnavailable,
            selectedDay,
            selectedMonth,
            selectedYear
          })
        }
      </tbody>
    </table>
    <br/>
  </div>
)
