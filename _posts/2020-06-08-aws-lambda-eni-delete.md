---
title: Delete Lambda ENI - You are not allowed to manage 'ela-attach' attachments
date: 2020-06-08 18:30:00 -0600
categories: [AWS, Lambda]
tags: [Lambda, AWS, Fix, troubleshooting, aws lambda eni, networking, AWS ENI force
    delete, akolte, abhiman kolte, howto]
toc: true
seo:
  date_modified: 2020-06-08 20:18:49 -0500
---

## Unable to delete ENIs created by AWS Lambda

### AWS Lambda ENIs(Elastic Network Interface)

When a Lambda function is set to run in VPC to access VPC resources e.g. RDS instances, EC2, Elasticache instances, etc. Lambda service creates ENIs in your account using the function execution role. These Hyperplane ENIs are managed by Lambda service. Benefits of this mechanism is improved performance and the number of ENIs required no longer scale to the number of concurrent Lambda executions.

Source: https://aws.amazon.com/blogs/compute/announcing-improved-vpc-networking-for-aws-lambda-functions/

### Manually delete these ENIs

![enter image description here](https://res.cloudinary.com/abemurica/image/upload/v1667018212/misc/lambda-eni_mpukhn.png)
These ENIs are managed by Lambda service that means you cannot manually delete them unless released by Lambda service.
Lambda service releases and deletes these ENIs once the last function using these ENIs is deleted or reconfigured to no longer to use these ENIs.

#### Solution

AWS provides simple script which can list the functions/function versions that use the given ENI. [Link to the script](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-eni-find-delete/). Lambda service will share ENIs between multiple functions so as to not consume IPs in your subnet. ENIs are shared based on same Subnet/Security Group combination. After all functions/function versions using the ENI are deleted, Lambda service will release and delete the ENIs within 20 to 40 minutes. If the function execution role is deleted before Lambda can delete the ENIs, then you will have to manually delete the ENIs.

All of the information in this post is available in the provided links.
