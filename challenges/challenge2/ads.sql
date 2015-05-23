select s.ad_id, sum(s.impressions) as impressions,
    sum(s.clicks) as clicks, sum(s.spent) as spent,
    a.action, a.count, a.value, a.cpa
from ad_statistics s
inner join (select ad_id, date, action, sum(count) as count, sum(value) as value,
            sum(cast(value as double)) / sum(cast(count as double)) as cpa
            from ad_actions
            where ad_id in (PARAM_IDS)
                and date >= $begindate_i and date < $enddate_i
            group by ad_id, date, action) as a
    on a.ad_id = s.ad_id and a.date = s.date

where s.date >= $begindate_o and s.date < $enddate_o
    and s.ad_id in (PARAM_IDS)

group by s.ad_id, a.action

order by s.ad_id, a.action;