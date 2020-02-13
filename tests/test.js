import assert from 'assert';
import { calculateLengthPlusGirth, isSpecialOversize, isStandardSize, sizeTier, SMALL_STANDARD_SIZE, LARGE_STANDARD_SIZE, SMALL_OVERSIZE_SIZE, MEDIUM_OVERSIZE_SIZE, LARGE_OVERSIZE_SIZE, SPECIAL_OVERSIZE_SIZE } from './../SizeTier';
import { cost } from '../Cost';

describe('Item', () => {
    describe('cost', () => {
        it('Large oversize', () => assert.equal(cost({length: 54, width: 35, height: 3.5, weight: 41}), 75.78))
        it('Small oversize', () => assert.equal(cost({length: 24, width: 7.5, height: 6, weight: 7.9}), 10.92))

        it('Large standard size (over 3 lb)', () => assert.equal(cost({length: 12.6, width: 6.6, height: 5.5, weight: 3.35}), 5.80))
        it('Small standard size (0 to 10 oz)', () => assert.equal(cost({length: 13.8, width: 0.7, height: 9, weight: 0.18}), 2.50))
    })
})

describe('sizeTier', () => {
    describe('calculateLengthPlusGirth()', () => {
        it('should equal', () => assert.equal(calculateLengthPlusGirth({length: 10, width: 10, height: 20}), 60))
    })
    describe('isSpecialOversize()', () => {
        it('Over 150 lb', () => assert.equal(isSpecialOversize({length: 10, width: 10, height: 20, weight: 151}), true))
        it('Length + girth Over 165 inches', () => assert.equal(isSpecialOversize({length: 107, width: 10, height: 50, weight: 149}), true))
        it('Over 108 inches', () => assert.equal(isSpecialOversize({length: 109, width: 10, height: 50, weight: 149}), true))
        it('should false', () => assert.equal(isSpecialOversize({length: 10, width: 10, height: 20, weight: 150}), false))
    })

    describe('isStandardSize()', () => {
        it('weighs over 20 lb', () => assert.equal(isStandardSize({length: 5, width: 5, height: 5, weight: 21}), false))
        it('over 18 inches on its longest side', () => assert.equal(isStandardSize({length: 5, width: 19, height: 5, weight: 20}), false))
        it('over 14 inches on its median side', () => assert.equal(isStandardSize({length: 5, width: 18, height: 15, weight: 20}), false))
        it('over 8 inches on its shortest side', () => assert.equal(isStandardSize({length: 9, width: 18, height: 14, weight: 20}), false))
        it('true', () => assert.equal(isStandardSize({length: 8, width: 18, height: 14, weight: 20}), true))
    })


    describe('sizeTier()', () => {
        it(SMALL_STANDARD_SIZE, () => assert.equal(sizeTier({length: 5, width: 5, height: 0.75, weight: 0.5}), SMALL_STANDARD_SIZE))
        it(LARGE_STANDARD_SIZE, () => assert.equal(sizeTier({length: 5, width: 5, height: 2, weight: 2}), LARGE_STANDARD_SIZE))
        it(SMALL_OVERSIZE_SIZE, () => assert.equal(sizeTier({length: 8, width: 30, height: 5, weight: 70}), SMALL_OVERSIZE_SIZE))
        it(MEDIUM_OVERSIZE_SIZE, () => assert.equal(sizeTier({length: 15, width: 15, height: 20, weight: 150}), MEDIUM_OVERSIZE_SIZE))
        it(LARGE_OVERSIZE_SIZE, () => assert.equal(sizeTier({length: 108, width: 10, height: 10, weight: 150}), LARGE_OVERSIZE_SIZE))
        it(SPECIAL_OVERSIZE_SIZE, () => assert.equal(sizeTier({length: 5, width: 5, height: 0.75, weight: 151}), SPECIAL_OVERSIZE_SIZE))
    })
})
