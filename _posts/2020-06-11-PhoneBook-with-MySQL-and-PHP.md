---
title: PhoneBook Application using MySQL and PHP
date: 2020-06-11 10:34:00 +0800
categories: [Web Development]
tags:
  [
    MySQL,
    PHP,
    jQuery,
    Abhiman Kolte,
    akolte,
    Phonebook project,
    project in php for phonebook,
    contact web application PHP,
    PHP contacts app,
    PHP MySQL web application,
  ]
toc: true
seo:
  date_modified: 2020-06-11 15:00:18 -0500
gallery:
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/landingpage_dhpzsp.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/landingpage_dhpzsp.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1667018295/phonebook/contactdetails_algdcu.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1667018295/phonebook/contactdetails_algdcu.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/update_wbbrc0.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/update_wbbrc0.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/createnew_qvzshl.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/createnew_qvzshl.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/progressbar_xryzku.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/progressbar_xryzku.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search_vsl8av.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search_vsl8av.png
---

## Overview

This is a simple phone book web application which supports:

- New contact creation
- Existing contact deletion
- Updating any existing contact
- Responsive User Interface

## Technologies Used

- Front-End: HTML, Bootstrap 4, jQuery
- Backend: MYSQL, PHP, Apache Server

## Source code
Complete source code for this project is available at
[GitHub](https://github.com/abhimanbhau/CS6360-DB-PhoneBookApplication)

## User Interface Walkthrough

### Landing Page

![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/landingpage_dhpzsp.png)
This is the landing page of my application which displays all existing contacts on the left with the Details pane on the right. The Update and Delete buttons are initially disabled.

### Contact Details

![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018295/phonebook/contactdetails_algdcu.png)
Upon clicking on a particular contact, the update and delete functionality gets activated. We can also see the corresponding contact details for the clicked contact.

### Update Contact

![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/update_wbbrc0.png)
Clicking on the update button opens up a window where user can enter changed details. The changes are captured once user clicks on Save Changes button. We can add or delete phone, address or dates as required.

### Contact Creation

![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/createnew_qvzshl.png)
Similarly, to create a new contact, user has to click on create contact button and choose Save Changes button to capture the new information.

### Progress Bar

![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/progressbar_xryzku.png)
The yellow progress bar gives the user an idea of the size of contacts retrieved for each query.

### Search Bar

![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search_vsl8av.png)
The search window allows user to search with various combinations. Here we are searching by Zip code. Hence all contact in that zip code are shown.
![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search2_oiubry.png)
We now search for a combination of zip and area code. This returns the specific contact match both criteria.
![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search3_mqthzs.png)
We can also search by last name if we need the results to be more specific.
![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search4_f0wgx9.png)
While searching for address, user has to input it with hyphens. This is to help us differentiate each entry as my logic is building sql queries dynamically.
![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search5_vo5qtu.png)
If there are more than one entry matching a first name, all of them are displayed.
![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search6_cgnopp.png)
We can also search by date of birth, entered in the specified format.
![Architecture](https://res.cloudinary.com/abemurica/image/upload/v1667018294/phonebook/search7_iuzkrc.png)
We can search by city and state as shown above.

## How to run the project

### Install MAMP/WAMP/LAMP stack
Download the free version of MAMP(macOS): [https://www.mamp.info/en/downloads/](https://www.mamp.info/en/downloads/), LAMP(Linux): [https://bitnami.com/stack/lamp/installer](https://bitnami.com/stack/lamp/installer) or WAMP(Windows): [https://www.wampserver.com/en/download-wampserver-64bits/](https://www.wampserver.com/en/download-wampserver-64bits/). 

### Setup MySQL database
- Create database inside MySQL named 'dbproject'.
- Execute the 'Create.SQL' file on the previously created database.
- Import the CSV file (contact.csv) using MySQL workbench.

### PHP Back-end setup
- Copy all the PHP files and index.html file from the root of the project into the htdocs folder of Apache installation. [Learn more](https://home.ubalt.edu/abento/linux/apache/apache-windows.shtml)

### Front-end
- Once the above steps are completed, the website should be available at 'localhost:80' or '127.0.0.1:80'. 
> Please check the port of Apache during the installation

## Technical details
This web application is written in PHP as back-end programming language and MySQL as the database. Bootstrap 4 is used to implement responsive UI. jQuery is used to handle the dynamic web page changes.

Backend is implemented as REST APIs. Each PHP file listens for requests on an endpoint and either serves the appropriate data or processes requested operation. 

1. contact_details.php API - Returns the Name, Address and Dates data for a contact in JSON format idenitified by Contact_ID.
2. Data creation APIs - These are set of APIs which creates the object and inserts into respective tables. 
> create_address.php | create_date.php | create_contact.php
4. Data update APIs - These APIs facilitate data modification.
> update_address.php | update_date.php | update_contact.php
5. Data delete APIs - These APIs delete the data associated with contacts in contraint aware manner.
> delete_contact.php
5. index.html - This is the main HTML page of the web application.

## Gallery

{% include gallery caption="Images" %}
