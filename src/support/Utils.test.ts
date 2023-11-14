import {describe, test, expect} from '@jest/globals';
import {Utils} from "./Utils";

// 1 unit test per matcher

describe('Utils Test Suite', () => {

    test('add function should add two numbers', () => {
        //TODO: Tobe implemented
        expect(Utils.sum(1, 2)).toBe(3)
    })
})