const merge = require('deepmerge');
import isPlainObject from 'is-plain-object'

export default function (defaultOptions, newOptions) {
  return merge(defaultOptions, newOptions, {
    isMergeableObject: isPlainObject
  })
}
