---
title: "Configure your store to produce Intelligent Search reports"
sidebar_label: "Configure your store to produce Intelligent Search reports"
---

# How to configure your store to produce Intelligent Search reports

This guide covers how to have Intelligent Search (IS) reports for your store. You'll be able to do this by sending the appropriate user events to IS.

Intelligent Search reports might be empty because there is no user data to feed them. To do that, events have to be sent containing additional metadata returned during search queries.

> Be mindful of the reference Pull Request present in the Additional Resources section. It contains all the changes required to make the Next.js starter work appropriately and might serve as an accompanying, more practical guide.

---

## Before you start

Before you begin, you should already have:

- `@faststore/api` installed with version `1.12.35` or higher. If you are coming from a previous version, be aware of possible breaking changes that might have been introduced in other versions of the package.

You should also consider that:

- This guide is based on the Next.js starter. Still, it is applicable to Gatsby stores as they should require a fairly similar process.
- Intelligent Search reports only consider full-text searches.
- Reports might take up to 8 hours to show on the respective admin page after all steps are completed.

---

## Step by step

### Step 1 - Adding required fields to full-text search queries

1. Find every full-text search query in the store

In the Next JS starters, they are the `ProductGalleryQuery` and `SearchSuggestionsQuery`.

> Not every search query is full-text. You can consider a search query as being full-text if the query variable `term` is not empty. 

2. Add the metadata fragment to above one of the queries

Here's the snippet for the metadata fragment:

```gql
fragment SearchEvent_metadata on SearchMetadata {
  isTermMisspelled
  logicalOperator
}
```

3. Add the metadata field and subfields (fragment) to your search query

```gql
metadata {
    ...SearchEvent_metadata
}
```

4. If not yet present, add the `products.pageInfo.totalCount` field to the query

```gql
products {
    pageInfo {
        totalCount
    }
}
```

After all the steps, the `ProductGalleryQuery` in the Next.js starter looked like this:

```ts
export const query = gql`
  fragment SearchEvent_metadata on SearchMetadata {
    isTermMisspelled
    logicalOperator
  }

  query ProductGalleryQuery(
    $first: Int!
    $after: String!
    $sort: StoreSort!
    $term: String!
    $selectedFacets: [IStoreSelectedFacet!]!
  ) {
    search(
      first: $first
      after: $after
      sort: $sort
      term: $term
      selectedFacets: $selectedFacets
    ) {
      products {
        pageInfo {
          totalCount
        }
      }
      facets {
        ...Filter_facets
      }
      metadata {
        ...SearchEvent_metadata
      }
    }
  }
`;
```

5. Generate the types from the GraphQL queries

Run the store (`yarn develop`) in a terminal. In another terminal, run the `yarn generate` command to update the types generated from the GraphQL queries inside the store.

### Step 2 - Send the event to the DOM

For the event to be sent to Intelligent Search, it first has to be sent to the DOM, so it can be read by the appropriate handler.

1. Add `intelligent_search_query` event types to the store's SDK

In the `src/sdk/analytics/types.ts` file, add the following types:

```ts
export interface IntelligentSearchQueryParams {
  url: string;
  locale: string;
  term: string;
  logicalOperator: string;
  isTermMisspelled: boolean;
  totalCount: number;
}

export interface IntelligentSearchQueryEvent {
  name: "intelligent_search_query";
  params: IntelligentSearchQueryParams;
}
```

2. Add `onSucess` callback to search query callers

Find out where the queries are being called and add an `onSucess` callback that fires the `intelligent_search_query` event to each of them.

These events should include the required data based on the event type added in step 1. For that, you might need to call hooks to gather the necessary information, such as the current `locale`.

You should use `@faststore/sdk`'s `sendAnalyticsEvent` helper function to send these events.

Here's an example:

```ts
useQuery<Query, Variables>(query, localizedVariables, {
  onSuccess: (data) => {
    if (data && term) {
      sendAnalyticsEvent<IntelligentSearchQueryEvent>({
        name: "intelligent_search_query",
        params: {
          locale,
          term,
          url: window.location.href,
          logicalOperator: data.search.metadata?.logicalOperator ?? "and",
          isTermMisspelled: data.search.metadata?.isTermMisspelled ?? false,
          totalCount: data.search.products.pageInfo.totalCount,
        },
      });
    }
  },
});
```

### Step 3 - Send the event to Intelligent Search

Update the `src/sdk/analytics/platform/vtex/search.ts` file to look exactly like [this copy](https://github.com/vtex-sites/nextjs.store/blob/955742acaeba8cce078bae558fa0ceb966eaa2d6/src/sdk/analytics/platform/vtex/search.ts) of that same file.

This will update the analytics Search handler to deal with the newly created `intelligent_search_query` event.

## Considerations

The effect of these changes on the Intelligent Search Analytics page can take up to 8 hours. You can check if you have implemented everything correctly by looking for requests to https://sp.vtex.com/event-api/v1 on your browser's Network Tab

---

## Additional resources

[Next.js starter Pull Request - reference](https://github.com/vtex-sites/nextjs.store/pull/373)
