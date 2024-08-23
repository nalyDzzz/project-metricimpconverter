const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("convertHandler should correctly read a whole number", (done) => {
        assert.equal(convertHandler.getNum('50mi'), 50);
        done();
    });
    test("convertHandler should correctly read a decimal number", (done) => {
        assert.equal(convertHandler.getNum('5.5mi'), 5.5);
        done();
    });
    test("convertHandler should correctly read a fractional input", (done) => {
        assert.equal(convertHandler.getNum('1/2mi'), 1/2);
        done();
    });
    test("convertHandler should correctly read a fractional input with a decimal.", (done) => {
        assert.equal(convertHandler.getNum('0.5/1gal'), 0.5/1);
        done();
    });
    test("convertHandler should correctly return an error on a double-fraction", (done) => {
        assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
        done();
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", (done) => {
        assert.equal(convertHandler.getNum('mi'), 1);
        done();
    });
    test("convertHandler should correctly read each valid input unit.", (done) => {
        const input = ["gal", "l", "mi", "km", "lbs", "kg"];
        const output = ["gal", "L", "mi", "km", "lbs", "kg"];
        input.forEach((el, i) => {
            assert.equal(convertHandler.getUnit(el), output[i])
        });
        input.forEach((el, i) => {
            assert.equal(convertHandler.getUnit(el.toUpperCase()), output[i])
        });
        done();
    });
    test("convertHandler should correctly return an error for an invalid input unit.", (done) => {
        assert.equal(convertHandler.getUnit('gigawatts'), 'invalid unit')
        done();
    });
    test("convertHandler should return the correct return unit for each valid input unit.", (done) => {
        const input = ["gal", "l", "mi", "km", "lbs", "kg"];
        const output = ["L", "gal", "km", "mi", "kg", "lbs"];
        input.forEach((el, i) => {
            assert.equal(convertHandler.getReturnUnit(el), output[i]);
        })
        
        done();
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", (done) => {
        const input = ["gal", "l", "mi", "km", "lbs", "kg"];
        const output = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
        input.forEach((el, i) => {
            assert.equal(convertHandler.spellOutUnit(el), output[i]);
        });
        done();
    });
    test("convertHandler should correctly convert gal to L.", (done) => {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541)
        done();
    });
    test("convertHandler should correctly convert L to gal.", (done) => {
        assert.equal(convertHandler.convert(1, 'L'), 0.26417);
        done();
    });
    test("convertHandler should correctly convert mi to km.", (done) => {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
        done();
    });
    test("convertHandler should correctly convert km to mi.", (done) => {
        assert.equal(convertHandler.convert(1, 'km'), 0.62137);
        done();
    });
    test("convertHandler should correctly convert lbs to kg", (done) => {
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
        done();
    });
    test("convertHandler should correctly convert kg to lbs", (done) => {
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
        done();
    });
});