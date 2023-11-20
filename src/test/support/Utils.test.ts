import {describe, test, expect} from '@jest/globals';
import { utils } from '../../support/Utils'

// 1 unit test per matcher

describe('Utils Test Suite', () => {

    test('add function should add two numbers', () => {
        //TODO: Tobe implemented
        expect(utils.sum(1, 2)).toBe(3)
    })
})