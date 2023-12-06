import { ClassOfManyThings } from "../../support/ClassOfManyThings"
import {Utils} from "../../support/Utils"
import {describe, expect, jest, test} from '@jest/globals';

describe('Test Examples: Mock functions', () => {

    test('Example 1', async () => {
        const msg = 'test error';
        let callbackFunction = jest.fn();

        const inst = new Utils();
        inst.forwardError(msg, callbackFunction);
        expect(callbackFunction).toHaveBeenCalledTimes(1);
        expect(callbackFunction).toHaveBeenCalledWith(msg);
    })

    test('Example 2',() => {
        const x = 1;
        const y = 1;

        let mockedUtils = new (<any>Utils)() as jest.Mocked<Utils>;
        mockedUtils.sum = jest.fn((a: number, b: number) => {
            console.log('Mock Implementation')
            return a - b;
        })

        const inst = new ClassOfManyThings(mockedUtils);
        const result = inst.someMethod(x, y)
        expect(result).toBe(x-y)
    })
})

describe('Exercise: Testing async code',  () => {

    test('Exercise 1: Test the returning promise(1)', () => {
        const msg = "To be a good tester";
        const inst = new ClassOfManyThings(new Utils());

        inst.promiseMeThis(msg)
    })

    test('Exercise 2: Fix the asynchronous test(2)', () => {
        const msg = "To be a good tester";
        const inst = new ClassOfManyThings(new Utils());

        const result = inst.promiseMeThis(msg);
        expect(result).toBe(msg);
    })

    test('Exercise 3: Test the resolved value(3)', async () => {
        const msg = "To be a good tester";
        const inst = new ClassOfManyThings(new Utils());

        await inst.promiseMeThis(msg)
    })
})

describe.skip('Exercise: Mocked functions',() => {

    test('Mock callback function',() => {
        /**
         * 1. Define 'callBackFunction' as mock
         * 2. Assert result is expected
         * 3. Assert callBackFunction have been called 1 time with expected arg
         */

        /* 1 */
        let callBackFunction;

        const userID = 'xox'
        const obj = {
            userId: userID,
            anotherUserID: 100
        }

        const someClass = new ClassOfManyThings(new Utils())
        const result = someClass.methodWithCallback(obj, 'userId', callBackFunction)

        /* 2 */
        expect(result);
        /* 3 */
        expect(callBackFunction);
    })

    test('Ex 2: Mock a function that is being called from function under test',() => {
        const x = 2;
        const y = 2;

        /**
         * 1. Create Utils object as jest mock
         * 2. Define mocked Utils.divide() as jest mock that return multiplication of 2 numbers
         */

        /* 1 */
        let mockedUtils;
        /* 2 */
        mockedUtils.divide;

        const inst = new ClassOfManyThings(mockedUtils);
        const result = inst.anotherMethod(x, y)
        expect(result).toBe(x * y)
    })
})
