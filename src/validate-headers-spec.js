'use strict'

const validate = require('./validate-headers')
const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('validate headers', () => {
  const deps = {
    foo: '1.2.5',
    bar: '^2.2.0',
    baz: '~3.5.0'
  }

  it('is a function', () => {
    la(is.fn(validate))
  })

  it('likes strict version', () => {
    const headers = {}
    headers[validate.NAME_HEADER] = 'foo'
    headers[validate.VERSION_HEADER] = deps.foo

    const satisfies = validate(deps, headers)
    la(satisfies)
  })

  describe('caret ^', () => {
    it('likes caret version patch', () => {
      const headers = {}
      headers[validate.NAME_HEADER] = 'bar'
      headers[validate.VERSION_HEADER] = '2.2.3'

      const satisfies = validate(deps, headers)
      la(satisfies)
    })

    it('likes caret version minor', () => {
      const headers = {}
      headers[validate.NAME_HEADER] = 'bar'
      headers[validate.VERSION_HEADER] = '2.3.0'

      const satisfies = validate(deps, headers)
      la(satisfies)
    })

    it('likes caret version up to major', () => {
      const headers = {}
      headers[validate.NAME_HEADER] = 'bar'
      headers[validate.VERSION_HEADER] = '3.0.0'

      const satisfies = validate(deps, headers)
      la(!satisfies)
    })
  })

  describe('tilda ~', () => {
    it('likes tilda exact', () => {
      const headers = {}
      headers[validate.NAME_HEADER] = 'baz'
      headers[validate.VERSION_HEADER] = '3.5.0'

      const satisfies = validate(deps, headers)
      la(satisfies)
    })

    it('likes tilda patch', () => {
      const headers = {}
      headers[validate.NAME_HEADER] = 'baz'
      headers[validate.VERSION_HEADER] = '3.5.6'

      const satisfies = validate(deps, headers)
      la(satisfies)
    })

    it('does not allow below tilda', () => {
      const headers = {}
      headers[validate.NAME_HEADER] = 'baz'
      headers[validate.VERSION_HEADER] = '3.4.0'

      const satisfies = validate(deps, headers)
      la(!satisfies)
    })

    it('does not allow tilda minor', () => {
      const headers = {}
      headers[validate.NAME_HEADER] = 'baz'
      headers[validate.VERSION_HEADER] = '3.6.0'

      const satisfies = validate(deps, headers)
      la(!satisfies)
    })
  })
})
