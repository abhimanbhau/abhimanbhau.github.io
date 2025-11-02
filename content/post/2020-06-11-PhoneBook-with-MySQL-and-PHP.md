---
categories:
- Web Development
date: '2020-06-11T10:34:00Z'
seo:
  date_modified: 2020-06-11 15:00:18 -0500
tags:
- MySQL
- PHP
- jQuery
- Abhiman Kolte
- Phonebook Project
- Web Application
- Contacts App
- PHP MySQL
- Web Development
title: PhoneBook Application using MySQL and PHP
toc: true
---

## Overview

This is a simple phone book web application which supports:

-   **New contact creation**
-   **Existing contact deletion**
-   **Updating any existing contact**
-   **Responsive User Interface**

## Technologies Used

-   Front-End: **HTML**, **Bootstrap 4**, **jQuery**
-   Backend: **MySQL**, **PHP**, **Apache Server**

## Source code
Complete source code for this project is available at
[GitHub](https://github.com/abhimanbhau/CS6360-DB-PhoneBookApplication)

## User Interface Walkthrough

### Landing Page

![Landing Page](/images/phonebook/landingpage.png)
This is the landing page of my application which displays all existing contacts on the left with the Details pane on the right. The **Update and Delete buttons** are initially disabled.

### Contact Details

![Contact Details](/images/phonebook/contactdetails.png)
Upon clicking on a particular contact, the update and delete functionality gets activated. We can also see the corresponding contact details for the clicked contact.

### Update Contact

![Update Contact Form](/images/phonebook/update.png)
Clicking on the update button opens up a window where user can enter changed details. The changes are captured once user clicks on **Save Changes button**. We can add or delete phone, address or dates as required.

### Contact Creation

![Create New Contact Form](/images/phonebook/createnew.png)
Similarly, to create a new contact, user has to click on create contact button and choose **Save Changes button** to capture the new information.

### Progress Bar

![Progress Bar](/images/phonebook/progressbar.png)
The **yellow progress bar** gives the user an idea of the size of contacts retrieved for each query.

### Search Bar

![Search by Zip Code](/images/phonebook/search.png)
The **search window** allows user to search with various combinations. Here we are searching by **Zip code**. Hence all contact in that zip code are shown.
![Search by Zip and Area Code](/images/phonebook/search2.png)
We now search for a combination of **zip and area code**. This returns the specific contact match both criteria.
![Search by Last Name](/images/phonebook/search3.png)
We can also search by **last name** if we need the results to be more specific.
![Search by Address](/images/phonebook/search4.png)
While searching for **address**, user has to input it with hyphens. This is to help us differentiate each entry as my logic is building sql queries dynamically.
![Search by First Name](/images/phonebook/search5.png)
If there are more than one entry matching a **first name**, all of them are displayed.
![Search by Date of Birth](/images/phonebook/search6.png)
We can also search by **date of birth**, entered in the specified format.
![Search by City and State](/images/phonebook/search7.png)
We can search by **city and state** as shown above.

## How to run the project

### Install **MAMP/WAMP/LAMP** stack
Download the free version of **MAMP** (macOS): [https://www.mamp.info/en/downloads/](https://www.mamp.info/en/downloads/), **LAMP** (Linux): [https://bitnami.com/stack/lamp/installer](https://bitnami.com/stack/lamp/installer) or **WAMP** (Windows): [https://www.wampserver.com/en/download-wampserver-64bits/](https://www.wampserver.com/en/download-wampserver-64bits/). 

### Setup **MySQL** database
- Create database inside **MySQL** named 'dbproject'.
- Execute the '**Create.SQL**' file on the previously created database.
- Import the **CSV** file (**contact.csv**) using **MySQL workbench**.

### **PHP** Back-end setup
- Copy all the **PHP** files and **index.html** file from the root of the project into the **htdocs** folder of **Apache** installation. [Learn more](https://home.ubalt.edu/abento/linux/apache/apache-windows.shtml)

### Front-end
- Once the above steps are completed, the website should be available at '**localhost:80**' or '**127.0.0.1:80**'. 
> Please check the port of **Apache** during the installation

## Technical details
This web application is written in **PHP** as back-end programming language and **MySQL** as the database. **Bootstrap 4** is used to implement responsive UI. **jQuery** is used to handle the dynamic web page changes.

Backend is implemented as **REST APIs**. Each **PHP** file listens for requests on an endpoint and either serves the appropriate data or processes requested operation. 

1.  `contact_details.php` API - Returns the Name, Address and Dates data for a contact in JSON format identified by Contact_ID.
2.  Data creation APIs - These are set of APIs which creates the object and inserts into respective tables. 
    > `create_address.php` | `create_date.php` | `create_contact.php`
3.  Data update APIs - These APIs facilitate data modification.
    > `update_address.php` | `update_date.php` | `update_contact.php`
4.  Data delete APIs - These APIs delete the data associated with contacts in a constraint-aware manner.
    > `delete_contact.php`
5.  `index.html` - This is the main HTML page of the web application.

