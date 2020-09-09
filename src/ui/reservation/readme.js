export default ({
  commands,
  customizableClasses,
  description,
  image,
  name,
  providers,
  reusableFunctions
}) => `
  <div style="width: 900px; padding-bottom: 20px; color: aliceblue;" class="container">
    <h2>${name}</h2>
    <p style="font-size: 16px; line-height: 140%;">${description}</p>
    <img style="margin: 50px 0 50px 0; box-shadow: 0 0 5px 0 rgba(255,255,255,0.5); max-width: 900px; height: auto;" class="image" src="${image}"/>
    ${
      customizableClasses.length > 0 ? `
        <h4 style="color: dodgerblue;">Customizable CSS classes</h4>
        <ul>
        ${
          customizableClasses.map(className => `
            <li style="margin-top: 3px">${className}</li>
          `).join('')
        }
        </ul>
        ` : ''
    }
    ${
      providers.length > 0 ? `
        <h4 style="color: dodgerblue;">Providers</h4>
        <ul>
        ${
          providers.map(provider => `
            <li style="margin-top: 3px">${provider}</li>
          `).join('')
        }
        </ul>
        ` : ''
    }
    ${
      commands.length > 0 ? `
        <h4 style="color: dodgerblue;">Commands</h4>
        <ul>
        ${
          commands.map(command => `
            <li style="margin-top: 3px">${command}</li>
            `).join('')
        }
        </ul>
        ` : ''
    }
    ${
      reusableFunctions.length > 0 ? `
        <h4 style="color: dodgerblue;">Reusable functions</h4>
        <ul>
        ${
        reusableFunctions.map(functionName => `
            <li style="margin-top: 3px">${functionName}</li>
          `).join('')
        }
        </ul>
        ` : ''
    }
  </div>
`
