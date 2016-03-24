'use strict'

const validate = require('./validate-headers')
const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('validate headers', () => {
  const deps = {
    foo: '1.2.5',
    bar: '^2.2.0',
    baz: '~3.5.0',
    bad: '10.*.1'
  }

  function headers (name, version) {
    const headers = {}
    headers[validate.NAME_HEADER] = name
    headers[validate.VERSION_HEADER] = version
    return headers
  }

  it('is a function', () => {
    la(is.fn(validate))
  })

  it('likes strict version', () => {
    la(validate(deps, headers('foo', '1.2.5')))
  })

  describe('caret ^', () => {
    it('likes caret version patch', () => {
      la(validate(deps, headers('bar', '2.2.3')))
    })

    it('likes caret version minor', () => {
      const satisfies = validate(deps, headers('bar', '2.3.0'))
      la(satisfies)
    })

    it('likes caret version up to major', () => {
      const satisfies = validate(deps, headers('bar', '3.0.0'))
      la(!satisfies)
    })
  })

  describe('tilda ~', () => {
    it('likes tilda exact', () => {
      const satisfies = validate(deps, headers('baz', '3.5.0'))
      la(satisfies)
    })

    it('likes tilda patch', () => {
      const satisfies = validate(deps, headers('baz', '3.5.6'))
      la(satisfies)
    })

    it('does not allow below tilda', () => {
      const satisfies = validate(deps, headers('baz', '3.4.0'))
      la(!satisfies)
    })

    it('does not allow tilda minor', () => {
      const satisfies = validate(deps, headers('baz', '3.6.0'))
      la(!satisfies)
    })
  })

  describe('wildard *', () => {
    it('likes exact', () => {
      const satisfies = validate(deps, headers('bad', '10.0.1'))
      la(satisfies)
    })

    it('likes higher minor', () => {
      const satisfies = validate(deps, headers('bad', '10.5.1'))
      la(satisfies)
    })

    it('allows diff patch', () => {
      const satisfies = validate(deps, headers('bad', '10.5.2'))
      la(satisfies)
    })

    it('does not allow diff major', () => {
      const satisfies = validate(deps, headers('bad', '11.5.1'))
      la(!satisfies)
    })
  })
})
