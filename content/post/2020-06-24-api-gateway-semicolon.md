---
categories:
- AWS
- Lambda
date: '2020-06-24T18:30:00Z'
seo:
  date_modified: 2020-06-24 20:18:49 -0500
tags:
- API Gateway
- AWS
- Fix
- troubleshooting
- networking
- API Gateway semicolon
- API GW semicolon fix
- gateway semicolon not working
- aws semicolon incorrect data
- akolte
- abhiman kolte
- howto
title: Resolving Semicolon Issues in AWS API Gateway URLs
toc: true
---

## Introduction: The Semicolon Challenge in API Gateway

When working with AWS API Gateway, developers often encounter unexpected behavior when using semicolons (`;`) within URL query strings or path parameters. This seemingly innocuous character can lead to data being incorrectly parsed or split, causing issues with your API requests. This post will delve into this known limitation and provide a straightforward workaround to ensure your API functions as expected.

## Understanding the Problem

AWS API Gateway has a documented limitation regarding the use of semicolons in request URLs. Specifically, the official AWS documentation states:

> The semicolon character (;) is not supported for any request URL query string and results in the data being split.

This means that if you pass a semicolon in your query parameters or path parameters, API Gateway will interpret it as a delimiter, effectively splitting your intended single value into multiple parts. This can lead to incomplete or incorrect data being passed to your backend services, such as AWS Lambda functions.

### Example of the Issue

Consider an API endpoint where you intend to pass a query parameter `q` with a value containing a semicolon:

```
https://API_INVOKE_URL/v1?q=abcd;20
```

In this scenario, API Gateway will not treat `abcd;20` as a single value for `q`. Instead, it will likely split it, leading to unexpected results.

## The Workaround: URL Encoding

The recommended and most effective workaround for this limitation is to **URL encode** the semicolon character. URL encoding replaces unsafe ASCII characters with a `%` followed by two hexadecimal digits. For a semicolon (`;`), the URL encoded equivalent is `%3B`.

By encoding the semicolon, you ensure that API Gateway treats the entire string as a single, unbroken value, preventing any unintended splitting.

### Applying the Workaround

To fix the example above, you would modify your request URL as follows:

**Original (problematic) URL:**

```
https://API_INVOKE_URL/v1?q=abcd;20
```

**Corrected (URL encoded) URL:**

```
https://API_INVOKE_URL/v1?q=abcd%3B20
```

When your backend service receives this request, it will correctly interpret `q` as `abcd;20` after URL decoding the parameter.

## Conclusion

The semicolon limitation in AWS API Gateway can be a source of frustration if not properly addressed. By understanding that API Gateway splits data on semicolons and consistently applying URL encoding (`%3B`) for this character in your URLs, you can ensure robust and predictable behavior for your API endpoints. Always refer to the [AWS API Gateway Known Issues](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html) documentation for the most up-to-date information on service limitations.
