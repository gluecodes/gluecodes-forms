export const form = () => [
  [
    {
      property: 'title'
    },
    {
      property: 'name',
      placeholder: 'Full name'
    },
    {
      property: 'email',
      placeholder: 'Email'
    }
  ],
  [
    {
      property: 'subject',
      placeholder: 'Subject'
    }
  ],
  [
    {
      property: 'message',
      placeholder: 'Message'
    }
  ],
  [
    {
      property: 'captchaToken',
      customUiControl: 'captcha'
    }
  ]
]
