# Wish list app example

This is an example of how a wish list app would integrate with the store framework.

## Troubleshooting

## Block does not appear in the product page

Make sure you have in your `blocks.json`:

```diff
 "store.product": {
   "blocks": [
     // ...other blocks
+    "product-bookmark",
     // ...other blocks
   ]
 }
```

## Block does not appear in shelf

Make sure to add the block in the summary:

```diff
 "product-summary.shelf": {
   "children": [
     // ...other blocks
+    "product-bookmark",
     // ...other blocks
   ]
 }
```
