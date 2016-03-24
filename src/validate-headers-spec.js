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

  function pass (name, version) {
    const h = headers(name, version)
    la(validate(deps, h), h)
  }

  function fail (name, version) {
    const h = headers(name, version)
    la(!validate(deps, h), h)
  }

  it('is a function', () => {
    la(is.fn(validate))
  })

  it('likes strict version', () => {
    pass('foo', '1.2.5')
  })

  describe('caret ^', () => {
    it('likes caret version patch', () => {
      pass('bar', '2.2.3')
    })

    it('likes caret version minor', () => {
      pass('bar', '2.3.0')
    })

    it('likes caret version up to major', () => {
      fail('bar', '3.0.0')
    })
  })

  describe('tilda ~', () => {
    it('likes tilda exact', () => {
      pass('baz', '3.5.0')
    })

    it('likes tilda patch', () => {
      pass('baz', '3.5.6')
    })

    it('does not allow below tilda', () => {
      fail('baz', '3.4.0')
    })

    it('does not allow tilda minor', () => {
      fail('baz', '3.6.0')
    })
  })

  describe('wildard *', () => {
    it('likes exact', () => {
      pass('bad', '10.0.1')
    })

    it('likes higher minor', () => {
      pass('bad', '10.5.1')
    })

    it('allows diff patch', () => {
      pass('bad', '10.5.2')
    })

    it('does not allow diff major', () => {
      fail('bad', '11.5.1')
    })
  })
})
