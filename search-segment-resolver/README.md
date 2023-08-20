# search-segment-resolver

The `vtex.search-segment-resolver` is a boilerplate that you can use for you own implementation of the segment search (TODO: add the segment documentation link).

## Usage

1.  Fork this project.
2.  Change the `vendor` in the `manifest.json` file.
3.  Change the `searchSegment` function in the `/node/resolver/segmentSearch.ts` file. It will receive the `userEmail` as argument and must return an array of facets. Exanoke:

    ```javascript
    export const queries = {
        searchSegment: async (_: unknown, args: SearchSegmentInput, __: Context) => {
            const { userEmail } = args

            switch (userEmail) {
            case 'myclient@shoes.com':
                return [{ key: 'category-1', value: 'shoes' }]

            case 'myclient@shirts.com':
                return [{ key: 'category-1', value: 'shirt' }]

            case 'myclient@hats.com':
                return [{ key: 'category-1', value: 'hats' }]

            default:
                return []
            }
        },
    }
    ```
    3.5 If you want to call an external API, you can add a new client to the `node/clients` diredtory.
4. Link/install the app on your workspace.