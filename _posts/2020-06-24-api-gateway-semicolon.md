---
title: AWS API Gateway Semicolon ';' in URL
date: 2020-06-24 18:30:00 -0600
categories: [AWS, Lambda]
tags: [API Gateway, AWS, Fix, troubleshooting, networking, API Gateway semicolon, API GW semicolon fix, gateway semicolon not working, aws semicolon incorrect data, akolte, abhiman kolte, howto]
toc: true
seo:
  date_modified: 2020-06-24 20:18:49 -0500
---

## AWS API Gateway Semicolon ';' in URL

### Unable to use semicolon within the URL

This is a known limitation with the API Gateway[1]. 
AWS public documentation says:
> The semicolon character (;) is not supported for any request URL query string and results in the data being split.

API Gateway will split the input (queryparams/pathparams) on a semicolon.
As a workaround, urlencode the semicolon (%3B). 

e.g.
https://API_INVOKE_URL/v1?q=abcd;20

to

https://API_INVOKE_URL/v1?q=abcd%3B20


References:
[1] [https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html)


All of the information in this post is available in the provided links.
