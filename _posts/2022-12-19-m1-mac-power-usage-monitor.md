---
title: Monitoring power usage and efficiency of M1 Mac CPU/GPU
date: 2022-12-19 22:00:00 -0600
categories: [mac]
tags: [macbook, m1 pro, m1 mac, m1 chip, macos, m1, macbook pro, m1 arm mac, m1 mac power usage, InfluxDB, powermetrics mac]
toc: true
seo:
  date_modified: 2022-12-19 22:00:00 -0600
gallery:
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671584102/mac_power_monitor/Screen_Shot_2022-12-20_at_4.41.17_PM_o9jaze.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671584102/mac_power_monitor/Screen_Shot_2022-12-20_at_4.41.17_PM_o9jaze.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.41.30_PM_ics576.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.41.30_PM_ics576.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.46.03_PM_a8vxtd.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.46.03_PM_a8vxtd.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.43.56_PM_uj2zlc.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.43.56_PM_uj2zlc.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671584098/mac_power_monitor/Screen_Shot_2022-12-20_at_4.48.18_PM_rz47r5.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671584098/mac_power_monitor/Screen_Shot_2022-12-20_at_4.48.18_PM_rz47r5.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671584100/mac_power_monitor/Screen_Shot_2022-12-20_at_4.53.55_PM_fnmx0n.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671584100/mac_power_monitor/Screen_Shot_2022-12-20_at_4.53.55_PM_fnmx0n.png

---

# Monitoring power usage and efficiency of M1 Mac's CPU/GPU

## Intro
I recently got the 2021 Macbook Pro 16 inch with M1 Pro chip. It has been absolute beast for my daily tasks and programming needs. I was apprehensive about the move to ARM mac due to the initial software incompatibility due the new architecture. But software support on ARM has come a long way. All the tools that I need for everyday development are available as native ARM binaries. Battery endurance is unmatched. My previous 2019 Intel Core i7 Macbook Pro used to last me 7-8 hours on average day. This mac easily lasts me 10-12 hours in same use-case scenario. Best thing about the new Mac is the silent operation. I rarely have seen the fan ramp. During long code compilations which run over 10 minutes I see fan ramp up to about 20-25% but that's about it. It's very silent during most of my use.

## Idea behind power consumption monitoring of M1 Macbook
New Apple designed M1 chips are very power efficient. M1 chips are SoC's meaning package contains CPU and GPU and other coprocessors such as ML/NeuralNet processor. DRAM is also on board and is shared between the CPU and GPU. Apple calls its approach a “Unified Memory Architecture” (UMA). Apple made sure to boast the power efficiency and performance per watts in their launch keynote with lots of data-points and graphs. I can already see the incredible power efficiency in work due to the heavy compilation workloads that I have to run constantly and the machine can still keep up in performance and the battery backup. Interesting observation I made about the Macbook was performance is not reduced when charger is taken off. M1 chip sustains the same amount of performance on battery power. I wanted to measure the power consumption of M1 chip's CPU, GPU and DRAM module.

##  Setup

### Powermetrics
Macos has a built-in utility called *`powermetrics`*. This small program/command output detailed information about metrics related to the power consumption. 

If we run this command, it outputs detailed power consumption metrics on 2 second intervals.

```bash
sudo powermetrics -i 2000 --samplers cpu_power -a --hide-cpu-duty-cycle
```

This will output something like this every two seconds on the terminal

```bash
P1-Cluster Power: 100 mW
P1-Cluster HW active frequency: 679 MHz
P1-Cluster HW active residency:   2.27% (600 MHz:  95% 828 MHz:   0% 1056 MHz: .52% 1296 MHz: .55% 1524 MHz: .82% 1752 MHz: .19% 1980 MHz: .68% 2208 MHz: .34% 2448 MHz: .20% 2676 MHz: .22% 2904 MHz:   0% 3036 MHz: .45% 3132 MHz: .03% 3168 MHz:   0% 3228 MHz: 1.1%)
P1-Cluster idle residency:  97.73%
P1-Cluster instructions retired: 5.13456e+08
P1-Cluster instructions per clock: 1.78784
CPU 6 frequency: 2367 MHz
CPU 6 idle residency:  97.76%
CPU 6 active residency:   2.24% (600 MHz: .03% 828 MHz:   0% 1056 MHz: .09% 1296 MHz: .19% 1524 MHz: .39% 1752 MHz: .13% 1980 MHz: .20% 2208 MHz: .03% 2448 MHz: .20% 2676 MHz:   0% 2904 MHz:   0% 3036 MHz:   0% 3132 MHz:   0% 3168 MHz:   0% 3228 MHz: .98%)
CPU 7 frequency: 2233 MHz
CPU 7 idle residency:  98.51%
CPU 7 active residency:   1.49% (600 MHz: .00% 828 MHz:   0% 1056 MHz: .02% 1296 MHz: .18% 1524 MHz: .39% 1752 MHz: .02% 1980 MHz: .18% 2208 MHz:   0% 2448 MHz: .20% 2676 MHz:   0% 2904 MHz:   0% 3036 MHz:   0% 3132 MHz:   0% 3168 MHz:   0% 3228 MHz: .49%)
CPU 8 frequency: 2247 MHz
CPU 8 idle residency:  98.58%
CPU 8 active residency:   1.42% (600 MHz: .00% 828 MHz:   0% 1056 MHz: .00% 1296 MHz: .16% 1524 MHz: .39% 1752 MHz: .00% 1980 MHz: .20% 2208 MHz:   0% 2448 MHz: .20% 2676 MHz:   0% 2904 MHz:   0% 3036 MHz:   0% 3132 MHz:   0% 3168 MHz:   0% 3228 MHz: .47%)
CPU 9 frequency: 2247 MHz
CPU 9 idle residency:  98.59%
CPU 9 active residency:   1.41% (600 MHz: .00% 828 MHz:   0% 1056 MHz:   0% 1296 MHz: .17% 1524 MHz: .39% 1752 MHz:   0% 1980 MHz: .20% 2208 MHz:   0% 2448 MHz: .19% 2676 MHz:   0% 2904 MHz:   0% 3036 MHz:   0% 3132 MHz:   0% 3168 MHz:   0% 3228 MHz: .47%)

System instructions retired: 1.25248e+10
System instructions per clock: 1.35631
ANE Power: 0 mW
DRAM Power: 688 mW
CPU Power: 742 mW
GPU Power: 26 mW
Package Power: 2151 mW
```

Great but I can't keep terminal window open and constantly look at the output which contains too much jargon. If I am going to monitor the power consumption across various workloads such as idle, browsing, compiling code or gaming, I need to save these metrics into a time series database.


### Homebrew
Homebrew is a open source package manager for Macos(and now linux too). It allows us to install programs on Macos via terminal. I have detailed guide on how to install and setup Homebrew on Macos at [Homebrew install](https://abhimanbhau.github.io/aws/macos/setup-oh-my-zsh-macos/).


### InfluxDB
InfluxDB is a open source time series database written in Go. It is very high performant and lightweight on resources. I have used InfluxDB in several of personal side projects. It is very easy to setup using homebrew and to get it running. I specifically chose to use InfluxDB due to prior experience with it and simplicity of writing wrapper program in Python to push data into the database using it's API.

InfluxDB can be installed via Homebrew by simply running following command.

```bash
brew install influxdb
```

This will install InfluxDB along with its dependencies. After successful installation the background service can be started with 

```bash
brew services start influxdb
==> Successfully started `influxdb` (label: homebrew.mxcl.influxdb)
```

InfluxDB runs on port 8086 by default. Assuming you did not make any changes to its default configuration, you can see if everything is properly installed and running by accessing it on localhost at port 8086

> http://127.0.0.1:8086 or http://localhost:8086

If InfluxDB welcome page loads up, congratulations everything is setup properly. You can follow official documentation to setup the credentials and bucket at [docs](https://docs.influxdata.com/influxdb/v2.0/install/).

After the setup is completed and verified to be working please setup a API key that we will be using in the Python wrapper program to push data into the InfluxDB storage.

![Login](https://res.cloudinary.com/abemurica/image/upload/v1671584102/mac_power_monitor/Screen_Shot_2022-12-20_at_4.41.17_PM_o9jaze.png)
![Welcome](https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.41.30_PM_ics576.png)

### Python3 influxdb-client library
We need to push the metrics we get from the powermetrics tool into time series database. For this we make use of the programmatic API provided by the InfluxDB. Specifically the example I will be providing uses Python API. However you can use any programming language you are familiar with. InfluxDB console also provides boilerplate code to get started in multiple popular programming languages. Please note that there are pre-requisites to writing code such as making sure the libraries for influxdb to be installed. 

Macos comes preinstalled with Python3. Version of Python3 can be verified by running,
```bash
python3 --version
```

Python3 version does not matter for this project but can be upgraded by installing Python3 via brew. 

Before we get started with writing the code to push the metrics into InfluxDB time series database, we need to install the *influxdb-client* python library. This can be done by running

```bash
pip3 install influxdb-client
```

This will install the library globally for the current user. In case you want to install the library into current folder for easy cleanup later, use this command.

```bash
pip3 install influxdb-client -t .
```


### Python3 script
Onto the Python script which will use InfluxDB API to save the metrics into the database. Use any text editor to type following Python code and save it into file named 'python-metrics-daemon.py'. Filename can be anything but further commands will require changes accordingly.

```python

from datetime import datetime
import signal
import sys
import subprocess

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# You can generate an API token from the "API Tokens Tab" in the UI
token = "<API_TOKEN>"
org = "<ORG_ID>"
bucket = "<BUCKET_NAME>"

client = InfluxDBClient(url="http://localhost:8086", token=token, org=org)
write_api = client.write_api(write_options=SYNCHRONOUS)

process = subprocess.Popen("/usr/bin/powermetrics -i 300 --samplers cpu_power -a --hide-cpu-duty-cycle", shell=True, stdout=subprocess.PIPE, bufsize=3)
while True:
    out = process.stdout.readline().decode()
    if out == '' and process.poll() != None:
        break
    if out != '':
        if ' Power: ' in out:
            metrics = out.split(' Power: ')
            point = Point(metrics[0]) \
                .tag("host", "host1") \
                .field("power", int(metrics[1].replace('mW', ''))) \
                .time(datetime.utcnow(), WritePrecision.NS)

            write_api.write(bucket, org, point)
            sys.stdout.flush()


with subprocess.Popen("/usr/bin/powermetrics -i 300 --samplers cpu_power -a --hide-cpu-duty-cycle | grep -B 2 'GPU Power'", shell=True, stdout=subprocess.PIPE, bufsize=3) as p:
    for c in iter(lambda: p.stdout.readline(), b''):
        sys.stdout.write(c)
    for line in p.stdout.read():
        metrics = line.split(' Power: ')
        print(line)
```

Please replace the placeholders with appropriate values for API token, Organization ID and Bucket name that was setup in the initial steps.

**Explanation of the python code.** 
1. We first use the boilerplate code from the influxdb dashboard to connect to our backend service. We provide necessary credentials for doing so.
2. We then run the powermetrics command from python subprocess module and process its output.
3. From the example output of the command we can see that we can filter the output by string `POWER:` which will get three values. CPU, GPU and Package Power. Package Power is total power consumption of the entire M1 SoC including mainly CPU, GPU and DRAM.
4. We then save these three values to the database.

This script needs to run constanly in the terminal and will need to be run with elevated privileges.

```bash
sudo python3 python-metrics-daemon.py
```

 > **Script does not output anything into the terminal. You can head onto the InfluxDB dashboard and search the fields for CPU or GPU. If these fields do not appear in the search results of fields in the bucket, make sure all the prior steps are followed correctly and the required fields are set correctly in the python script.**


### InfluxDB dashboard setup
Now that we have data flowing into the InfluxDB time series database, we need to setup a nice dashboard to visualize the data. 

1. Open bucket on the influxdb UI
2. Create a new empty dashboard in the bucket.
3. Add three widgets for CPU Power, GPU Power and Total Power respectively. I chose to go with Gauge as it looks cool and shows values as a Speedometer so to speak. I just find it more intuitive. 
4. Now that we have three gauges added, we need to define the data to be used by the gauges.
5. Values that are stored in the time series database are stored in mW. I find it more intuitive to use Watts which makes it easier to compare the data with other machines online. 
6. Edit each gauge by clicking on the Settings(Cog) button and clicking Configure. This will open the Query window. Query is used to pull data from the time series database.
![gauge](https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.46.03_PM_a8vxtd.png)

For each of the three gauges use following queries. Make sure to verify bucket name in the query and change it appropriately. I have named my bucket name as 'mac-metrics-tsd'.

CPU:

```ts
from(bucket: "mac-metrics-tsd")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "CPU")
  |> map(fn: (r) => ({ r with _value: float(v:r._value)/1000.00}))
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "last")
```

GPU: 

```ts
from(bucket: "mac-metrics-tsd")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "GPU")
  |> map(fn: (r) => ({ r with _value: float(v:r._value)/1000.00}))
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "last")
```

TOTAL:

```ts
from(bucket: "mac-metrics-tsd")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Package")
  |> map(fn: (r) => ({ r with _value: float(v:r._value)/1000.00}))
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "last")
```


Save the queries and reload the page. You should see the gauges updating values in realtime. You can set the auto-refresh option to indefinite and 10s. I kept it running while I compiled a program, mac was pseudo-idle and running a GPU workload. Following are the results.

Idle:
![idle](https://res.cloudinary.com/abemurica/image/upload/v1671584097/mac_power_monitor/Screen_Shot_2022-12-20_at_4.43.56_PM_uj2zlc.png)

Code compilation:
![code](https://res.cloudinary.com/abemurica/image/upload/v1671584098/mac_power_monitor/Screen_Shot_2022-12-20_at_4.48.18_PM_rz47r5.png)

Video transcode:
![video](https://res.cloudinary.com/abemurica/image/upload/v1671584100/mac_power_monitor/Screen_Shot_2022-12-20_at_4.53.55_PM_fnmx0n.png)

{% include gallery caption="Power consumption/efficiency monitoring on M1 Mac" %}