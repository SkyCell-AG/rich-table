import generateParams from '../generateParams'

describe('generateParams', () => {
    test('params generated', () => {
        expect(
            generateParams(
                {
                    a: 1,
                },
                {
                    b: 1,
                },
                {
                    c: 1,
                },
            ),
        ).toEqual(
            {
                excludeFilters: {
                    c: 1,
                },
                filter: {
                    a: 1,
                },
                sort: {
                    b: 1,
                },
            },
        )
    })
})
