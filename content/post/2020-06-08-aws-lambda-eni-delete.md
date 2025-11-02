---
categories:
- AWS
- Lambda
date: '2020-06-08T18:30:00Z'
seo:
  date_modified: 2020-06-08 20:18:49 -0500
tags:
- Lambda
- AWS
- Fix
- troubleshooting
- aws lambda eni
- networking
- AWS ENI force delete
- akolte
- abhiman kolte
- howto
title: "Delete Lambda ENI - You are not allowed to manage 'ela-attach' attachments"
toc: true
---

## Unable to delete ENIs created by AWS Lambda

This post addresses a common issue encountered when working with **AWS Lambda** functions: the inability to delete **Elastic Network Interfaces (ENIs)** that are managed by the **Lambda** service. We will explore why this happens and provide a solution to effectively manage and delete these ENIs.

### AWS Lambda **ENIs** (**Elastic Network Interface**)

When a **Lambda** function is set to run in **VPC** to access **VPC** resources e.g. **RDS** instances, **EC2**, **Elasticache** instances, etc. **Lambda** service creates **ENIs** in your account using the function execution role. These **Hyperplane ENIs** are managed by **Lambda** service. Benefits of this mechanism is improved performance and the number of **ENIs** required no longer scale to the number of concurrent **Lambda** executions.

Source: [Improved VPC Networking for AWS Lambda Functions](https://aws.amazon.com/blogs/compute/announcing-improved-vpc-networking-for-aws-lambda-functions/)

### Manually Delete These **ENIs**

These **ENIs** are managed by the **Lambda** service, meaning you cannot manually delete them unless released by the **Lambda** service. The **Lambda** service releases and deletes these **ENIs** once the last function using them is deleted or reconfigured to no longer use them.

#### Solution

**AWS** provides a simple script which can list the functions/function versions that use a given **ENI**. [Link to the script](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-eni-find-delete/). The **Lambda** service will share **ENIs** between multiple functions so as to not consume **IPs** in your subnet. **ENIs** are shared based on the same **Subnet/Security Group** combination. After all functions/function versions using the **ENI** are deleted, the **Lambda** service will release and delete the **ENIs** within 20 to 40 minutes. If the function execution role is deleted before **Lambda** can delete the **ENIs**, then you will have to manually delete the **ENIs**.

All of the information in this post is available in the provided links.
