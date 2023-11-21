import { jest } from '@jest/globals';

export class TestProps {

    public mockResponse(...overrides): any {
        let res = {
            status: {},
            json: {},
            // Define properties and methods of the response object
            // Add any necessary properties or overrides specific to your middleware
            ...overrides,
        }

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        return res
    }
}

export const testUtils = new TestProps()