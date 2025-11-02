---
categories:
- AWS
date: '2020-10-20T23:34:00Z'
seo:
  date_modified: 2020-10-20 23:34:00 -0600
tags:
- AWS
- ec2
- cloud9
- ubuntu cloud9
- Amazon
- howto
- EC2
- Cloud9
- Ubuntu
- ubuntu cloud9
- cross account
title: Migrate Ubuntu based Cloud9 instance across AWS accounts
toc: true
---

## Migrate Ubuntu based Cloud9 instance across AWS accounts

Steps mentioned in the article at [migration guide](https://blog.ilearnaws.com/2020/07/25/how-do-i-move-a-cloud9-environment-from-one-aws-account-to-another/ ) do not work for Ubuntu based Cloud9 instances. Root volume is mounted at '/dev/sda1'. If you follow the steps from the article and change mount point from 'dev/xvda' to '/dev/sda1' but Cloud9 Console will stay stuck
    on connecting and fail after a while.

1. Create AMI from the existing EC2 instance and modify its permissions to allow access from second account.
2. Launch new EC2 instance from the EC2 console from second account using the AMI. Please select a available KeyPair or create a new one.
3. Connect to the newly launched EC2 instance from your PC.
4. Launch Cloud9 Console from the new account and select 'Create and run in remote server', copy the public RSA key and  paste it in '~/.ssh/authorized_keys' file on the new instance.
5. In the advanced settings, choose environment path as '~/enviroment'.
6. After clicking Next step, Cloud9 will try to connect to your instance and if successful, will launch the Cloud9 console with all the previous projects intact. 