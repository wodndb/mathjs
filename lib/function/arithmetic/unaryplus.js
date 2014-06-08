module.exports = function (math, config) {
  var util = require('../../util/index'),

      BigNumber = math.type.BigNumber,
      Complex = require('../../type/Complex'),
      Unit = require('../../type/Unit'),
      collection = require('../../type/collection'),

      isNumber = util.number.isNumber,
      isBoolean = util['boolean'].isBoolean,
      isString = util.string.isString,
      isComplex = Complex.isComplex,
      isUnit = Unit.isUnit,
      isCollection = collection.isCollection;

  /**
   * Unary plus operation.
   * Boolean values and strings will be converted to a number, numeric values will be returned as is.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.unaryplus(x)
   *
   * Examples:
   *
   *    var math = mathjs();
   *
   *    math.unaryplus(3.5);      // returns 3.5
   *    math.unaryplus(1);     // returns 1
   *
   * See also:
   *
   *    unaryminus, add, subtract
   *
   * @param  {Number | BigNumber | Boolean | String | Complex | Unit | Array | Matrix} x
   *            Input value
   * @return {Number | BigNumber | Complex | Unit | Array | Matrix}
   *            Returns the input value when numeric, converts to a number when input is non-numeric.
   */
  math.unaryplus = function unaryplus(x) {
    if (arguments.length != 1) {
      throw new math.error.ArgumentsError('unaryplus', arguments.length, 1);
    }

    if (isNumber(x)) {
      return x;
    }

    if (isComplex(x)) {
      return x.clone();
    }

    if (x instanceof BigNumber) {
      return x;
    }

    if (isUnit(x)) {
      return x.clone();
    }

    if (isCollection(x)) {
      return collection.deepMap(x, unaryplus);
    }

    if (isBoolean(x) || isString(x)) {
      // convert to a number or bignumber
      return (config.number == 'bignumber') ? new BigNumber(+x): +x;
    }

    throw new math.error.UnsupportedTypeError('unaryplus', math['typeof'](x));
  };
};