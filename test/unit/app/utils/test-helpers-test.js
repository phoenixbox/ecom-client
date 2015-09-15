import testHelpers from './test-helpers.js';
import {assert} from 'chai';

describe('testHelpers', function () {
  describe('#between', function() {
    beforeEach(function() {
      this.marginRange = {min: 0, max: 15}
    })
    it('returns true when the number is within the range', function () {
      var result = testHelpers.between(10, this.marginRange)

      assert.isTrue(result)
    });
    it('returns false when the number is not within the range', function () {
      var result = testHelpers.between(20, this.marginRange)

      assert.isFalse(result)
    });
  });
  describe('#marginCalc', function() {
    it('returns the min and max margins based on the range spread input', function () {
      let result = testHelpers.marginCalc(100, 0.9);
      let target = {
        min: 90,
        max: 110
      }

      assert.deepEqual(result, target)
    });
  })
});
