// TODO: Move to main repo
const fs = require('fs')
const fetch = require('node-fetch')

fetch(process.env.API_ENDPOINT + `/api`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => {
    // console.log('result', result)
    return result.json()
  })
  .then((result) => {
    console.log('result.data', result.data)
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      (type) => type.possibleTypes !== null
    )

    result.data.__schema.types = filteredData
    fs.writeFileSync(
      './graph-ql/fragmentTypes.json',
      JSON.stringify(result.data),
      (err) => {
        if (err) {
          console.log('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
  })
  .catch((e) => console.log(e))
