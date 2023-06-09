//
// Credit to Dave Stockley (magicspon)
// https://github.com/magicspon
//

import gql from 'graphql-tag'
import FormDataJson from 'form-data-json-convert'
import { isString, flatMap, isPlainObject } from 'lodash-es'

export const getFormFieldMeta = (form) => {
  const allRows = flatMap(form.pages, 'rows')
  const allFields = flatMap(allRows, 'fields')

  const fields = flatMap(allFields, ({ handle, inputTypeName }) => {
    return { handle, inputTypeName }
  })

  return fields
}

function createMutationHandle(form) {
  return `save_${form.handle}_Submission`
}

function createMutationTypes(form) {
  const types = getFormFieldMeta(form).map(({ handle, inputTypeName }) => {
    return `$${handle}: ${inputTypeName}`
  })

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha) => {
    types.push(`$${captcha.handle}: FormieCaptchaInput`)
  })

  return types.join(', ')
}

function createMutationValues(form) {
  const values = flatMap(getFormFieldMeta(form), 'handle').map((key) => {
    return `${key}: $${key}`
  })

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha) => {
    values.push(`${captcha.handle}: $${captcha.handle}`)
  })

  return values.join(', ')
}

export const getFormMutation = (form) => {
  const mutationTypes = createMutationTypes(form)
  const mutationHandle = createMutationHandle(form)
  const mutationValues = createMutationValues(form)

  return gql`
        mutation FormMutation(${mutationTypes}) {
            ${mutationHandle}(${mutationValues}) {
                id
            }
        }
    `
}

export const getMutationVariables = async (form, el) => {
  const object = await new Promise((resolve, reject) => {
    const files = {}
    FormDataJson.toJson(el, {
      inputFilter(field) {
        if (field.type === 'file') {
          files[field.id] = field.value.replace('C:\\fakepath\\', '')
        }
        return true
      },
      filesCallback(values, v) {
        for (const key in values) {
          const value = values[key]

          // Handle single-file input values, which are data values
          if (isString(value) && value.includes('data:')) {
            values[key] = [
              {
                fileData: value,

                // TODO: find a way to get the filename as well
                filename: files[key],
              },
            ]
          }
        }
        resolve(values)
      },
    })
    setTimeout(() => {
      const ret = FormDataJson.toJson(el)
      resolve(ret)
    }, 1000)
  })

  // Get the mutation types to ensure we cast everything properly
  const mutationTypes = getFormFieldMeta(form)

  mutationTypes.forEach((info) => {
    let value = object[info.handle]

    if (typeof value === 'undefined') {
      return
    }

    // Fix up any objects that look like arrays
    if (isPlainObject(value)) {
      if (typeof value[0] !== 'undefined') {
        value = Object.values(value)
      }
    }

    if (info.inputTypeName === 'Int') {
      value = parseInt(object[info.handle], 10)
    }

    if (info.inputTypeName === '[Int]') {
      if (isPlainObject(value)) {
        value = Object.values(value)
      }
      try {
        value = value.map((item) => {
          return parseInt(item, 10)
        })
      } catch {}
    }

    if (info.inputTypeName === 'Number') {
      value = Number(object[info.handle])
    }

    if (info.inputTypeName === '[Number]') {
      if (isPlainObject(value)) {
        value = Object.values(value)
      }

      value = value.map((item) => {
        return Number(item)
      })
    }

    object[info.handle] = value
  })

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha) => {
    object[captcha.handle] = {
      name: captcha.name,
      value: captcha.value,
    }
  })

  return object
}
