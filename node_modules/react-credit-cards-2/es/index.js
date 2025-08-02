function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cardTypesMap, getCardType, setInitialValidCardTypes, validateLuhn } from './utils/cardHelpers';

function ReactCreditCards(_ref) {
  var _ref$acceptedCards = _ref.acceptedCards,
      acceptedCards = _ref$acceptedCards === void 0 ? [] : _ref$acceptedCards,
      number = _ref.number,
      issuer = _ref.issuer,
      _ref$preview = _ref.preview,
      preview = _ref$preview === void 0 ? false : _ref$preview,
      expiry = _ref.expiry,
      cvc = _ref.cvc,
      focused = _ref.focused,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? {
    valid: 'valid thru'
  } : _ref$locale,
      name = _ref.name,
      _ref$placeholders = _ref.placeholders,
      placeholders = _ref$placeholders === void 0 ? {
    name: 'YOUR NAME HERE'
  } : _ref$placeholders,
      callback = _ref.callback;

  var _useState = useState(setInitialValidCardTypes()),
      _useState2 = _slicedToArray(_useState, 2),
      cardTypes = _useState2[0],
      setCardTypes = _useState2[1];

  var validCardTypes = useMemo(function () {
    if (acceptedCards !== null && acceptedCards !== void 0 && acceptedCards.length) {
      return cardTypes.filter(function (card) {
        return acceptedCards.indexOf(card) !== -1;
      });
    }

    return cardTypes;
  }, [acceptedCards, cardTypes]);
  var cardOptions = useMemo(function () {
    var updatedIssuer = 'unknown';

    if (number) {
      var validatedIssuer = getCardType(number);

      if (validCardTypes.indexOf(validatedIssuer) !== -1) {
        updatedIssuer = validatedIssuer;
      }
    }

    var maxLength = 16;

    if (cardTypesMap.amex.indexOf(updatedIssuer) !== -1) {
      maxLength = 15;
    } else if (cardTypesMap.dinersclub.indexOf(updatedIssuer) !== -1) {
      maxLength = 14;
    } else if (['hipercard', 'mastercard', 'visa'].indexOf(updatedIssuer) !== -1) {
      maxLength = 19;
    }

    return {
      issuer: updatedIssuer,
      maxLength: maxLength
    };
  }, [number, validCardTypes]);
  var cardIssuer = useMemo(function () {
    return preview && issuer ? issuer.toLowerCase() : cardOptions.issuer;
  }, [cardOptions.issuer, issuer, preview]);
  var cardNumber = useMemo(function () {
    var maxLength = preview ? 19 : cardOptions.maxLength;
    var nextNumber = typeof number === 'number' ? number.toString() : String(number).replace(/[A-Za-z]| /g, '');

    if (isNaN(parseInt(nextNumber, 10)) && !preview) {
      nextNumber = '';
    }

    if (maxLength > 16) {
      maxLength = nextNumber.length <= 16 ? 16 : maxLength;
    }

    if (nextNumber.length > maxLength) {
      nextNumber = nextNumber.slice(0, maxLength);
    }

    while (nextNumber.length < maxLength) {
      nextNumber += '•';
    }

    if (cardTypesMap.amex.indexOf(cardIssuer) !== -1 || cardTypesMap.dinersclub.indexOf(cardIssuer) !== -1) {
      var format = [0, 4, 10];
      var limit = [4, 6, 5];
      nextNumber = "".concat(nextNumber.substr(format[0], limit[0]), " ").concat(nextNumber.substr(format[1], limit[1]), " ").concat(nextNumber.substr(format[2], limit[2]));
    } else if (nextNumber.length > 16) {
      var _format = [0, 4, 8, 12];
      var _limit = [4, 7];
      nextNumber = "".concat(nextNumber.substr(_format[0], _limit[0]), " ").concat(nextNumber.substr(_format[1], _limit[0]), " ").concat(nextNumber.substr(_format[2], _limit[0]), " ").concat(nextNumber.substr(_format[3], _limit[1]));
    } else {
      for (var i = 1; i < maxLength / 4; i++) {
        var space_index = i * 4 + (i - 1);
        nextNumber = "".concat(nextNumber.slice(0, space_index), " ").concat(nextNumber.slice(space_index));
      }
    }

    return nextNumber;
  }, [cardOptions.maxLength, cardIssuer, number, preview]);
  var cardExpiry = useMemo(function () {
    var date = typeof expiry === 'number' ? expiry.toString() : expiry;
    var month = '';
    var year = '';

    if (date.indexOf('/') !== -1) {
      var _date$split = date.split('/');

      var _date$split2 = _slicedToArray(_date$split, 2);

      month = _date$split2[0];
      year = _date$split2[1];
    } else if (date.length) {
      month = date.substr(0, 2);
      year = date.substr(2, 6);
    }

    while (month.length < 2) {
      month += '•';
    }

    if (year.length > 2) {
      year = year.substr(2, 4);
    }

    while (year.length < 2) {
      year += '•';
    }

    return "".concat(month, "/").concat(year);
  }, [expiry]);
  var updateValidCardTypes = useCallback(function (acceptedCardsInput) {
    if (acceptedCardsInput.length) {
      setCardTypes(cardTypes.filter(function (card) {
        return acceptedCardsInput.indexOf(card) !== -1;
      }));
      return;
    }

    var initialValidCardTypes = setInitialValidCardTypes();
    setCardTypes(initialValidCardTypes);
  }, [cardTypes]);
  useEffect(function () {
    if (cardNumber !== number) {
      /* istanbul ignore else */
      if (typeof callback === 'function') {
        callback(cardOptions, validateLuhn(number));
      }
    }

    var initialValidCardTypes = setInitialValidCardTypes();

    if (initialValidCardTypes.toString() !== cardTypes.toString()) {
      updateValidCardTypes(acceptedCards);
    }
  }, [acceptedCards, callback, cardOptions, cardNumber, updateValidCardTypes, number, cardTypes]);
  return /*#__PURE__*/React.createElement("div", {
    key: "Cards",
    className: "rccs"
  }, /*#__PURE__*/React.createElement("div", {
    className: ['rccs__card', "rccs__card--".concat(cardIssuer), focused === 'cvc' && cardIssuer !== 'american-express' ? 'rccs__card--flipped' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("div", {
    className: "rccs__card--front"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rccs__card__background"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rccs__issuer"
  }), /*#__PURE__*/React.createElement("div", {
    className: ['rccs__cvc__front', focused === 'cvc' ? 'rccs--focused' : ''].join(' ').trim()
  }, cvc), /*#__PURE__*/React.createElement("div", {
    className: ['rccs__number', cardNumber.replace(/ /g, '').length > 16 ? 'rccs__number--large' : '', focused === 'number' ? 'rccs--focused' : '', cardNumber.substr(0, 1) !== '•' ? 'rccs--filled' : ''].join(' ').trim()
  }, cardNumber), /*#__PURE__*/React.createElement("div", {
    className: ['rccs__name', focused === 'name' ? 'rccs--focused' : '', name ? 'rccs--filled' : ''].join(' ').trim()
  }, name || placeholders.name), /*#__PURE__*/React.createElement("div", {
    className: ['rccs__expiry', focused === 'expiry' ? 'rccs--focused' : '', cardExpiry.substr(0, 1) !== '•' ? 'rccs--filled' : ''].join(' ').trim()
  }, /*#__PURE__*/React.createElement("div", {
    className: "rccs__expiry__valid"
  }, locale.valid), /*#__PURE__*/React.createElement("div", {
    className: "rccs__expiry__value"
  }, cardExpiry)), /*#__PURE__*/React.createElement("div", {
    className: "rccs__chip"
  })), /*#__PURE__*/React.createElement("div", {
    className: "rccs__card--back"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rccs__card__background"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rccs__stripe"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rccs__signature"
  }), /*#__PURE__*/React.createElement("div", {
    className: ['rccs__cvc', focused === 'cvc' ? 'rccs--focused' : ''].join(' ').trim()
  }, cvc), /*#__PURE__*/React.createElement("div", {
    className: "rccs__issuer"
  }))));
}

ReactCreditCards.propTypes = {
  acceptedCards: PropTypes.array,
  callback: PropTypes.func,
  cvc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expiry: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  focused: PropTypes.string,
  issuer: PropTypes.string,
  locale: PropTypes.shape({
    valid: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholders: PropTypes.shape({
    name: PropTypes.string
  }),
  preview: PropTypes.bool
};
ReactCreditCards.defaultProps = {
  acceptedCards: []
};
export default ReactCreditCards;