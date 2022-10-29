---
categories:
  - AWS
  - EC2
date: 2020-06-13 07:27:40 +00:00
gallery:
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server16_aouom8.jpg
    title: "IP changed to India"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server16_aouom8.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server17_nuh6ni.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server17_nuh6ni.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server18_wbaztq.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server18_wbaztq.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server2_hcwuxo.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server2_hcwuxo.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server3_rvvy8f.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server3_rvvy8f.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server5_vubjdq.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server5_vubjdq.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server6_ppgyiu.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server6_ppgyiu.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server7_mo4na8.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server7_mo4na8.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server8_khzvqi.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server8_khzvqi.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server9_pitof9.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server9_pitof9.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server10_yuunns.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server10_yuunns.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server12_ozkwim.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server12_ozkwim.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server13_rxtrw1.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server13_rxtrw1.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server14_yrtdat.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server14_yrtdat.jpg
  - alt: img
    image_path: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server15_zsu6qk.jpg
    title: "OpenVPN image"
    url: https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server15_zsu6qk.jpg
tags:
  - Lambda
  - AWS
  - Fix
  - troubleshooting
  - openvpn
  - vpn
  - "free vpn"
  - "india vpn"
  - "india vpn free"
  - "india vpn server free"
  - "ec2 vpn server"
  - ec2
  - "aws ec2"
  - networking
  - howto
title: "Setup your own VPN server on AWS(FREE)"
toc: true
---

## Introduction

VPN has become basic necessity these days. Some use VPN to increase your privacy over the internet or to access sites are region-locked. VPN helps to access people from other countries to access Netflix from other countries to access rich content library of Netflix US. There are a lot of VPN apps which claim to provide free/paid VPN servers. Some come with zero-log policies. But lot of these VPN server operators lack transperancy. Many times zero-log policy is baseless. Let's build our own VPN server using AWS EC2. I have chosen to host our VPN in AWS' Mumbai(India) region.

## Instructions

- Create AWS account and setup free tier. [Link](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc)
- Open EC2 dashboard in Mumbai(ap-south-1) region [Link](https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#Home:)
- Click on launch instance. ![vpn 2](<https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server2_hcwuxo.jpg>){: .align-right}
- Search 'openvpn' in AWS marketplace. ![vpn 3](<https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server3_rvvy8f.jpg>){: .align-right}
- Subscribe to 'OpenVPN Access Server'. It is free for one device.
- Select 't2.micro' as instance type. ![vpn 5](<https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server5_vubjdq.jpg>){: .align-left}
- Click review and launch.
- Launch the instance by clicking Launch. ![vpn 6](<https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server6_ppgyiu.jpg>){: .align-left}
- Create a new key pair or use a previously created a key pair. For Windows-putty users, use puttygen to convert .pem key to .ppk. ![vpn 7](<https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server7_mo4na8.jpg>){: .align-right}
- Instance should launch. Wait for 2-3 minutes for instance to finish launching. ![vpn 8](<https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server8_khzvqi.jpg>){: .align-right}
- Use the connect menu to get command for bash or look at the IP address of the instance to connect to.
- Login as the user 'openvpnas' ![vpn 9](<https://res.cloudinary.com/abemurica/image/upload/v1667006164/vpn/vpn_server9_pitof9.jpg>){: .align-center}
- You would be prompted with the initial configuration.

> Use the followoing options

```bash

          OpenVPN Access Server
          Initial Configuration Tool
------------------------------------------------------
Please enter 'yes' to indicate your agreement [no]: yes

Once you provide a few initial configuration settings,
OpenVPN Access Server can be configured by accessing
its Admin Web UI using your Web browser.

Will this be the primary Access Server node?
(enter 'no' to configure as a backup or standby node)
 Press ENTER for default [yes]:

Please specify the network interface and IP address to be
used by the Admin Web UI:
(1) all interfaces: 0.0.0.0
(2) eth0: 172.31.35.209
Please enter the option number from the list above (1-2).
 Press Enter for default [1]:

Please specify the port number for the Admin Web UI.
 Press ENTER for default [943]:

Please specify the TCP port number for the OpenVPN Daemon
> Press ENTER for default [443]:

Should client traffic be routed by default through the VPN?
 Press ENTER for default [no]: yes

Should client DNS traffic be routed by default through the VPN?
 Press ENTER for default [no]: yes

Use local authentication via internal DB?
 Press ENTER for default [yes]:

Private subnets detected: ['172.31.0.0/16']

Should private subnets be accessible to clients by default?
 Press ENTER for EC2 default [yes]:

To initially login to the Admin Web UI, you must use a
username and password that successfully authenticates you
with the host UNIX system (you can later modify the settings
so that RADIUS or LDAP is used for authentication instead).

You can login to the Admin Web UI as "openvpn" or specify
a different user account to use for this purpose.

Do you wish to login to the Admin UI as "openvpn"?
 Press ENTER for default [yes]:

 Please specify your Activation key (or leave blank to specify later):



Initializing OpenVPN...
Removing Cluster Admin user login...
userdel "admin_c"
Adding new user login...
useradd -s /sbin/nologin "openvpn"
Writing as configuration file...
Perform sa init...
Wiping any previous userdb...
Creating default profile...
Modifying default profile...
Adding new user to userdb...
Modifying new user as superuser in userdb...
Getting hostname...
Hostname: 13.233.225.57
Preparing web certificates...
Getting web user account...
Adding web group account...
Adding web group...
Adjusting license directory ownership...
Initializing confdb...
Generating PAM config...
Enabling service
Starting openvpnas...

NOTE: Your system clock must be correct for OpenVPN Access Server
to perform correctly.  Please ensure that your time and date
are correct on this system.

Initial Configuration Complete!

You can now continue configuring OpenVPN Access Server by
directing your Web browser to this URL:

https://13.233.225.57:943/admin
Login as "openvpn" with the same password used to authenticate
to this UNIX host.

During normal operation, OpenVPN AS can be accessed via these URLs:
Admin  UI: https://13.233.225.57:943/admin
Client UI: https://13.233.225.57:943/

See the Release Notes for this release at:
   https://openvpn.net/vpn-server-resources/release-notes/
```

- Setup a password for user 'openvpn' by running command

```bash
sudo passwd openvpn
```

![vpn 10](<https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server10_yuunns.jpg>){: .align-center}

- Open the IP address in the web browser with https:// prefix. E.g. https://127.0.0.1
- User name: openvpn and password from the previous step to login to the portal
- Download the OpenVPN client for your OS. ![vpn 12](</https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server12_ozkwim.jpg>){: .align-center}
- Install and open the client. The connection profile should be installed, if not download the profile from admin portal and install it in the client. ![vpn 13](<https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server13_rxtrw1.jpg>){: .align-center} ![vpn 14](<https://res.cloudinary.com/abemurica/image/upload/v1667006165/vpn/vpn_server14_yrtdat.jpg>){: .align-center}
- You should now be connected to the VPN server located in Mumbai, India.
- Here are some images to show the newsly created VPN server working:

{% include gallery caption="Images of the VPN server working." %}
