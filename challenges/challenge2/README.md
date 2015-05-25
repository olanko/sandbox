REST api for getting ad statitics.

GET /api/stats?ad_ids=1,2,3&start_time=2013-09-01&end_time=2013-10-01

params:

start_time, end_time defined time range

ad_ids comma separated ad_id values

TODO:

With more data I would create indexes for ad_id, date and use profiling to find the best combinations.

If data is considered static I would perhaps create a table with aggregated values if performance would be better that way.

To make tables smaller one could enumerate actions and use integers as action field instead of varchar.

If same requests are made often caching of somekind could be considered.

