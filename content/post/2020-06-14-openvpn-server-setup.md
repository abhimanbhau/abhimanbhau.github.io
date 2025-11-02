---
categories:
- AWS
- EC2
date: '2020-06-14T07:27:40Z'
tags:
- AWS
- EC2
- OpenVPN
- VPN
- Free VPN
- India VPN
- Networking
- How-to
title: Setup Your Own Free OpenVPN Server on AWS EC2
toc: true
---

## Introduction: Why a Personal VPN?

In today's digital landscape, a Virtual Private Network (VPN) has become an essential tool for safeguarding online privacy and accessing geo-restricted content. While numerous free and paid VPN services exist, many lack transparency regarding their logging policies and data handling. This guide empowers you to build your own secure and private VPN server using AWS EC2's free tier, giving you complete control over your online anonymity. We'll be hosting our VPN in AWS's Mumbai (India) region.

## Prerequisites

Before we begin, ensure you have:

*   An active AWS account with Free Tier access. If you don't have one, you can create it [here](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc).
*   Basic familiarity with AWS EC2.

## Step-by-Step Guide: Setting Up Your OpenVPN Server

Follow these detailed steps to deploy your OpenVPN Access Server on AWS EC2.

### 1. Launching an EC2 Instance

1.  **Navigate to EC2 Dashboard:** Open your AWS EC2 dashboard in the **Mumbai (ap-south-1) region**.
    [EC2 Dashboard Link](https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#Home:)

2.  **Initiate Instance Launch:** Click on the "**Launch instance**" button.
    ![Launch Instance](/images/vpn/vpn_server%20(2).jpg "Click 'Launch Instance' to begin")

3.  **Search for OpenVPN in AWS Marketplace:** In the AWS Marketplace, search for "**openvpn**".
    ![Search OpenVPN in AWS Marketplace](/images/vpn/vpn_server%20(3).jpg "Search for 'OpenVPN Access Server'")

4.  **Subscribe to OpenVPN Access Server:** Select and subscribe to "**OpenVPN Access Server**". This solution is free for one connected device, making it perfect for personal use.

5.  **Choose Instance Type:** Select the "**t2.micro**" instance type, which is eligible for the AWS Free Tier.
    ![Select t2.micro instance type](/images/vpn/vpn_server%20(5).jpg "Ensure 't2.micro' is selected for Free Tier eligibility")

6.  **Review and Launch:** Proceed to review your instance configuration and then click "**Launch**".
    ![Launch Instance Confirmation](/images/vpn/vpn_server%20(6).jpg "Confirm and launch your EC2 instance")

7.  **Key Pair Management:**
    *   **Create a new key pair:** If you don't have one, create a new key pair. This is crucial for securely connecting to your instance.
    *   **Use an existing key pair:** If you have a pre-existing key pair, you can use that.
    *   **For Windows users:** If you use PuTTY, you'll need to convert the `.pem` key file to a `.ppk` format using PuTTYgen.
    ![Create or Use Key Pair](/images/vpn/vpn_server%20(7).jpg "Choose or create a key pair for SSH access")

8.  **Instance Launch Confirmation:** Your instance should now be launching. Please wait for 2-3 minutes for it to fully initialize.
    ![Instance Launching](/images/vpn/vpn_server%20(8).jpg "Monitor the instance launch status")

### 2. Initial Configuration of OpenVPN Access Server

1.  **Connect to Your Instance:** Once the instance is running, use the AWS EC2 console's "Connect" option to get the SSH command, or simply note down the instance's public IP address.

2.  **SSH Login:** Log in to your EC2 instance via SSH using the username "**openvpnas**".
    ![Login as openvpnas](/images/vpn/vpn_server%20(9).jpg "SSH into the instance using the 'openvpnas' user")

3.  **OpenVPN Initial Configuration Wizard:** Upon successful login, you will be greeted by the OpenVPN Access Server initial configuration tool. Follow the prompts, using the recommended options below:

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
    (2) eth0: 172.31.35.209 # (Note: Your IP address will differ)
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
    # ... (output truncated for brevity) ...
    Starting openvpnas...

    **NOTE**: Your system clock must be correct for **OpenVPN Access Server** to perform correctly. Please ensure that your time and date are correct on this system.

    **Initial Configuration Complete!**

    You can now continue configuring **OpenVPN Access Server** by directing your Web browser to this URL:

    `https://YOUR_INSTANCE_IP:943/admin`
    Login as "openvpn" with the same password used to authenticate to this UNIX host.

    During normal operation, **OpenVPN AS** can be accessed via these URLs:
    **Admin UI**: `https://YOUR_INSTANCE_IP:943/admin`
    **Client UI**: `https://YOUR_INSTANCE_IP:943/`

    See the Release Notes for this release at:
       [https://openvpn.net/vpn-server-resources/release-notes/](https://openvpn.net/vpn-server-resources/release-notes/)
    ```

    **Important:** Replace `YOUR_INSTANCE_IP` with the actual public IP address of your EC2 instance.

4.  **Set Password for `openvpn` User:** Set a strong password for the `openvpn` user, which you will use to log into the Admin Web UI.

    ```bash
    sudo passwd openvpn
    ```
    ![OpenVPN Password Setup](/images/vpn/vpn_server%20(10).jpg "Set a secure password for the 'openvpn' user")

### 3. Accessing the OpenVPN Admin UI and Client Setup

1.  **Access Admin Web UI:** Open your web browser and navigate to the Admin UI URL provided in the previous step (e.g., `https://YOUR_INSTANCE_IP:943/admin`).

2.  **Login to Admin Portal:** Log in using the username "**openvpn**" and the password you set in the previous step.

3.  **Download OpenVPN Client:** From the Admin Portal, download the appropriate OpenVPN client for your operating system.
    ![OpenVPN Client Download](/images/vpn/vpn_server%20(12).jpg "Download the OpenVPN client for your OS")

4.  **Install and Connect:**
    *   Install the downloaded client.
    *   The connection profile should ideally be installed automatically. If not, download the client configuration profile from the Admin Portal and import it into your OpenVPN client.
    ![OpenVPN Client Profile Import](/images/vpn/vpn_server%20(13).jpg "Importing the OpenVPN client profile")
    ![OpenVPN Client Connection](/images/vpn/vpn_server%20(14).jpg "Connecting to the VPN server")

### 4. Verification

Congratulations! You should now be connected to your personal VPN server hosted in Mumbai, India. To verify, you can check your IP address and location using online tools.

Here are some screenshots demonstrating a successful connection:

*   ![VPN Connection Status 1](/images/vpn/vpn_server%20(15).jpg "Successful VPN connection")
*   ![VPN Connection Status 2](/images/vpn/vpn_server%20(16).jpg "VPN connection details")
*   ![VPN Connection Status 3](/images/vpn/vpn_server%20(17).jpg "IP address showing Mumbai, India")
*   ![VPN Connection Status 4](/images/vpn/vpn_server%20(18).jpg "Geo-location verification")

## Conclusion

By following this guide, you've successfully deployed your own OpenVPN server on AWS EC2. This provides a secure, private, and free solution for your VPN needs, giving you control and peace of mind over your internet traffic. Enjoy your enhanced online privacy and unrestricted access!
