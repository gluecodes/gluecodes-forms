const currentDate = new Date()

export default ({
  actionResults,
  actions
} = {
  actionResults: {
    changeDate: {}
  }
}) => ({
  currentDate,
  daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  disabledDates: [
    {
      day: 10,
      month: 4,
      year: 2020
    },
    {
      day: 15,
      month: 4,
      year: 2020
    }
  ],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  lastYear: currentDate.getFullYear() + 2,
  selectedDay: actionResults.changeDate.day || null,
  selectedMonth: typeof actionResults.changeDate.month === 'number' ? actionResults.changeDate.month : currentDate.getMonth(),
  selectedYear: actionResults.changeDate.year || currentDate.getFullYear(),
  onDateChanged: ({ day, month, year }) => {
    actions.changeDate(day, month, year)
  },
  onDateUnavailable: ({ day, month, year }) => {
    console.log('Date is unavailable', day, month, year)
  }
})
