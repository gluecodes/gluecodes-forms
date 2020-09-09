import uiControlValidationWrapper from '../uiControlValidationWrapper/index.jsx'
import googleReCaptcha from '../googleReCaptcha/index.jsx'
import getContentBlockId from '../../lib/helpers/getContentBlockId'
import externalStyles from '@app/styles'
import styles from './styles.css'

import '@app/commands/changeReservationDate'
import '@app/commands/changeReservationInquiry'
import '@app/commands/changeReservationPartOfDay'
import '@app/commands/changeReservationService'
import '@app/commands/changeReservationServiceQty'
import '@app/commands/increaseReservationPageNumber'
import '@app/commands/requestReservationPage'
import '@app/commands/submitReservationInquiry'
import '@app/providers/getDayNames'
import '@app/providers/getMonthNames'
import '@app/providers/getPersonPossibleTitles'
import '@app/providers/getReservationErrorMessages'
import '@app/providers/getReservationAvailablePartsOfDay'
import '@app/providers/getReservationAvailableServices'
import '@app/providers/getReservationAvailableTimeSlots'
import '@app/providers/getReservationConfirmMessage'
import '@app/providers/getReservationContactFormCopy'
import '@app/providers/getReservationContactFormModels'
import '@app/providers/getReservationContactFormRegistry'
import '@app/providers/getReservationDefaultPartOfDay'
import '@app/providers/getReservationDefaultService'
import '@app/providers/getReservationDefaultServiceQty'
import '@app/providers/getReservationDisabledDays'
import '@app/providers/getReservationInquiryEditableFields'
import '@app/providers/getReservationPageNumber'
import '@app/providers/getReservationServiceContentToDisplay'
import '@app/providers/getReservationServiceQtyOptions'
import '@app/providers/getReservationSummary'

export default ({
  actionResults,
  actions,
  calendar: {
    currentDate = new Date()
  } = {},
  getSlot,
  googleReCaptchaSiteKey,
  headline,
  navigationButtons,
  timeSlotSelector
}) => {
  let submitHandler
  return (
    <div className={`${styles['container-fluid']} ${styles['font-weight-normal']} ${styles.reservationWrapper}`}>
      <div className={`${styles.container} ${styles.headlineContainer}`}>
        <div className={`${externalStyles.row} ${externalStyles['text-center']}`}>
          <div className={`${externalStyles['col-12']} ${styles.headlineBar}`}>
            <p className={styles.headline} id={getContentBlockId(headline)}>{headline}</p>
          </div>
        </div>
      </div>
      <div className={`${externalStyles.container} ${styles.contentWrapper}`}>
        {
          actionResults.getReservationPageNumber === 1 ? (
            <div className={externalStyles.row}>
              <div className={`${externalStyles['col-lg-4']} ${externalStyles['col-md-6']} ${externalStyles['align-self-center']} ${styles.calendarWrapper}`}>
                {
                  getSlot({
                    id: 'serviceSelector',
                    data: {
                      selectedService: actionResults.changeReservationService || actionResults.getReservationDefaultService,
                      selectedQty: actionResults.changeReservationServiceQty || actionResults.getReservationDefaultServiceQty,
                      onServiceChanged: (id) => {
                        actions.changeReservationService(id)
                        actions.reload()
                      },
                      onQtyChanged: (id) => {
                        actions.changeReservationServiceQty(id)
                        actions.reload()
                      },
                      services: actionResults.getReservationAvailableServices,
                      qty: actionResults.getReservationServiceQtyOptions
                    }
                  })
                }
                {
                  getSlot({
                    id: 'calendar',
                    data: {
                      currentDate: currentDate,
                      daysOfWeek: actionResults.getDayNames,
                      displayJumpToDropDown: true,
                      displayTimesDropDown: true,
                      disabledDates: actionResults.getReservationDisabledDays,
                      months: actionResults.getMonthNames,
                      selectedDay: actionResults.changeReservationDate && actionResults.changeReservationDate.day ? actionResults.changeReservationDate.day : null,
                      selectedMonth: actionResults.changeReservationDate && typeof actionResults.changeReservationDate.month === 'number' ? actionResults.changeReservationDate.month : currentDate.getMonth(),
                      selectedYear: actionResults.changeReservationDate && actionResults.changeReservationDate.year ? actionResults.changeReservationDate.year : currentDate.getFullYear(),
                      onDateChanged: ({ day, month, year }) => {
                        actions.changeReservationDate({
                          day,
                          month,
                          year
                        })
                      }
                    }
                  })
                }
              </div>
              {
                <div className={`${externalStyles['col-lg-8']} ${externalStyles['col-md-6']} ${styles.productWrapper}`}>
                  {
                    getSlot({
                      id: 'productDescription',
                      data: {
                        headline: actionResults.getReservationServiceContentToDisplay.name,
                        summary: actionResults.getReservationServiceContentToDisplay.summary,
                        fullDescription: actionResults.getReservationServiceContentToDisplay.fullDescription,
                        image: {
                          src: actionResults.getReservationServiceContentToDisplay.image,
                          alternateText: actionResults.getReservationServiceContentToDisplay.name
                        }
                      }
                    })
                  }
                </div>
              }
              <div className={`${externalStyles['col-md-12']} ${styles.navigationWrapper}`}>
                {
                  actionResults.changeReservationDate && actionResults.changeReservationDate.day ? (
                    <button
                      className={`${styles.navigationButton} ${styles.next}`}
                      onclick={() => {
                        actions.requestReservationPage(2)
                        actions.reload()
                        global.document.getElementById(getContentBlockId(headline)).scrollIntoView()
                      }}>{navigationButtons.next}
                    </button>
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          actionResults.getReservationPageNumber === 2 ? (
            <div className={externalStyles.row}>
              <div className={externalStyles['col-md-8']}>
                {
                  getSlot({
                    id: 'timeSlots',
                    data: {
                      availableTimeSlots: actionResults.getReservationAvailableTimeSlots,
                      summary: actionResults.getReservationSummary,
                      onPartOfDayChanged: async (id) => {
                        await actions.runTogether([
                          ['changeReservationDate', {
                            day: actionResults.changeReservationDate.day,
                            month: actionResults.changeReservationDate.month,
                            year: actionResults.changeReservationDate.year,
                            hours: null,
                            minutes: null
                          }],
                          ['changeReservationPartOfDay', id]
                        ])
                        actions.reload()
                      },
                      onTimeSlotChanged: ({ hours, minutes }) => actions.changeReservationDate({
                        day: actionResults.changeReservationDate.day,
                        month: actionResults.changeReservationDate.month,
                        year: actionResults.changeReservationDate.year,
                        hours,
                        minutes
                      }),
                      selectedTimeSlot: actionResults.changeReservationDate,
                      selectedPartOfDay: actionResults.changeReservationPartOfDay,
                      timeOfDayChoice: {
                        explanationText: timeSlotSelector.explanationText,
                        options: actionResults.getReservationAvailablePartsOfDay
                      }
                    }
                  })
                }
              </div>
              <div className={`${externalStyles['col-md-12']} ${styles.navigationWrapper}`}>
                <button
                  className={`${styles.navigationButton} ${styles.prev}`}
                  onclick={async () => {
                    await actions.runTogether([
                      ['changeReservationDate', {
                        day: actionResults.changeReservationDate.day,
                        month: actionResults.changeReservationDate.month,
                        year: actionResults.changeReservationDate.year,
                        hours: null,
                        minutes: null
                      }],
                      ['requestReservationPage', 1]
                    ])
                    actions.reload()
                    global.document.getElementById(getContentBlockId(headline)).scrollIntoView()
                  }}>{navigationButtons.prev}
                </button>
                {
                  actionResults.changeReservationDate.hours ? (
                    <button
                      className={`${styles.navigationButton} ${styles.next}`}
                      onclick={() => {
                        actions.requestReservationPage(3)
                        actions.reload()
                        global.document.getElementById(getContentBlockId(headline)).scrollIntoView()
                      }}>{navigationButtons.next}
                    </button>
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          actionResults.getReservationPageNumber === 3 ? (
            <div className={`${externalStyles.row}`}>
              <div className={`${externalStyles['col-md-6']}`}>
                {
                  getSlot({
                    id: 'contactForm',
                    data: {
                      actionResults,
                      actions,
                      getSlot: (selector) => {
                        switch (selector.name) {
                          case 'baseForm': {
                            return getSlot({ id: 'baseForm' })
                          }
                          case 'captcha': {
                            const {
                              cancelError,
                              fail,
                              getErrorMessage,
                              hasActiveError,
                              updateValue,
                              ExternalFormError
                            } = selector

                            return uiControlValidationWrapper({
                              errorMessage: getErrorMessage(),
                              forwardReset: true,
                              hasActiveError,
                              uiControl: googleReCaptcha({
                                onChanged: (response) => {
                                  cancelError()
                                  updateValue(response)
                                },
                                onFailed: (err) => {
                                  console.error(err)
                                  fail(new ExternalFormError('Unexpected Google ReCaptcha failure'))
                                },
                                siteKey: googleReCaptchaSiteKey
                              })
                            })
                          }
                          case 'submitButton': {
                            submitHandler = selector.submitForm
                            return <span/>
                          }
                          default: {
                            return null
                          }
                        }
                      },
                      model: actionResults.getReservationContactFormModels.reservationInquiry,
                      reservationDateTime: actionResults.changeReservationDate || {},
                      selectedServiceId: actionResults.changeReservationService || actionResults.getReservationDefaultService,
                      selectedServiceQtyId: actionResults.changeReservationServiceQty || actionResults.getReservationDefaultServiceQty,
                      shouldShowLabels: false
                    }
                  })
                }
              </div>
              <div className={`${externalStyles['col-md-12']} ${styles.navigationWrapper}`}>
                <button
                  className={`${styles.navigationButton} ${styles.prev}`}
                  onclick={() => {
                    actions.requestReservationPage(2)
                    actions.reload()
                    global.document.getElementById(getContentBlockId(headline)).scrollIntoView()
                  }}>{navigationButtons.prev}
                </button>
                <button
                  className={`${styles.navigationButton} ${styles.next}`}
                  onclick={async () => {
                    if (await submitHandler()) {
                      actions.requestReservationPage(4)
                      actions.reload()
                      global.document.getElementById(getContentBlockId(headline)).scrollIntoView()
                    }
                  }}>{navigationButtons.next}
                </button>
              </div>
            </div>
          ) : null
        }
        {
          actionResults.getReservationPageNumber === 4 ? (
            <div className={externalStyles.row}>
              {
                getSlot({ id: 'reservationCompleteScreen', reservationConfirmMessage: actionResults.getReservationConfirmMessage })
              }
              <div className={`${externalStyles['col-md-12']} ${styles.navigationWrapper}`}>
                <button
                  className={`${styles.navigationButton} ${styles.complete}`}
                  onclick={() => {
                    actions.changeReservationDate({
                      day: null,
                      month: null,
                      year: null,
                      hours: null,
                      minutes: null
                    })
                    actionResults.changeReservationInquiry.captchaToken = null
                    actions.requestReservationPage(1)
                    actions.reload()
                    global.document.getElementById(getContentBlockId(headline)).scrollIntoView()
                  }}>{navigationButtons.complete}
                </button>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}
