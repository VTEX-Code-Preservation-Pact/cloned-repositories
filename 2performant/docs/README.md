# 2performant

Open the VTEX APP Store and install the app on your store.

or

Run the following command:

```sh
vtex install vtex.twoperformant@0.x
```

Next, open the app settings on your admin and fill the form with your Confirm and Campaign Unique info.


### Subtract TVA 

This new feature was specially created for a client, miniprix, that doesn't have taxes configured in VTEX but needs to send to 2Performant data without taxes. 
So I created a checkbox that when active and if there aren't any tax information coming from vtex, will subtract 19% (Romanian base tax) from the total value. 
