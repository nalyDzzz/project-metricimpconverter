function ConvertHandler() {
  this.getNum = function (input) {
    console.log('This is what the test is inputting:', input)
    const numRegex = /\d+[.]?[\d]?/g;
    const nums = input.match(numRegex) || [];
    console.log("numbers:", nums)
    const fractions = input.match(/(\/)/g) || [];
    console.log("fractions:", fractions)
    if (nums.length === 2 && fractions.length === 1) {
      return (parseFloat(nums[0]) / parseFloat(nums[1]));
    } else if (fractions.length >= 2) {
      return "invalid number";
    } else if (nums.length === 0) {
      return 1;
    } else {
      return parseFloat(nums[0]);
    }
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+/g;
    const units = input.toLowerCase().match(unitRegex) || [];
    if (units.length >= 2 || units.length === 0) {
      return "invalid unit";
    } else {
      switch (units[0].toLowerCase()) {
        case "l":
          return "L";
        case "gal":
        case "mi":
        case "km":
        case "lbs":
        case "kg":
          return units[0];
        default:
          return "invalid unit";
      }
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return undefined;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
        break;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
