"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

exports.__esModule = true;
exports.validateLuhn = exports.setInitialValidCardTypes = exports.sanitizeNumber = exports.getCardType = exports.cardTypesMap = void 0;

var _creditCardType = _interopRequireWildcard(require("credit-card-type"));

var _luhn = _interopRequireDefault(require("luhn"));

var _cardTypes = require("./cardTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Check if a credit card number is valid using the Luhn algorithm
 * @returns {boolean}
 */
var validateLuhn = _luhn.default.validate;
/**
 * Given a credit card number in the format (XXXX XXXX XXXX...) return it as a string without any spaces
 * @param {*} number
 * @returns {string} number
 */

exports.validateLuhn = validateLuhn;

var sanitizeNumber = function sanitizeNumber(number) {
  return number.toString().trim().replace(' ', '');
};
/**
 * Return the issuer of a given credit card number or `unknown` if the issuer can't be identified
 * @param {string|number} cardNumber
 * @returns {string} cardType
 */


exports.sanitizeNumber = sanitizeNumber;

var getCardType = function getCardType(cardNumber) {
  var potentialCardTypes = (0, _creditCardType.default)(sanitizeNumber(cardNumber));

  if (potentialCardTypes.length === 1) {
    var firstResult = potentialCardTypes.shift();
    return firstResult.type;
  }

  return 'unknown';
};
/**
 * Configure the credit card types supported and return an array of valid types
 * @returns {string[]} validCardTypes
 */


exports.getCardType = getCardType;

var setInitialValidCardTypes = function setInitialValidCardTypes() {
  _creditCardType.default.updateCard(_creditCardType.types.MAESTRO, {
    patterns: [493698, [5000, 5018], [502000, 506698], [506779, 508999], [56, 59], 63, 67, 6]
  });

  _creditCardType.default.updateCard(_creditCardType.types.HIPERCARD, {
    patterns: [384100, 384140, 384160, 606282, 637095, 637568]
  });

  _creditCardType.default.addCard(_cardTypes.dankort);

  _creditCardType.default.addCard(_cardTypes.laser);

  _creditCardType.default.addCard(_cardTypes.visaElectron);

  return Object.values(_creditCardType.types).concat(['dankort', 'laser', 'visa-electron']);
};
/**
 * Provides a map of patterns to match for some card types
 */


exports.setInitialValidCardTypes = setInitialValidCardTypes;
var cardTypesMap = {
  amex: ['amex', 'americanexpress', 'american-express'],
  dinersclub: ['diners', 'dinersclub', 'diners-club'],
  visaelectron: ['visaelectron', 'visa-electron']
};
exports.cardTypesMap = cardTypesMap;