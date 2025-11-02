--- 
categories:
- mac
date: '2022-12-19T22:00:00Z'
seo:
  date_modified: 2022-12-19 22:00:00 -0600
tags:
- macbook
- m1 pro
- m1 mac
- m1 chip
- macos
- m1
- macbook pro
- m1 arm mac
- m1 mac power usage
- InfluxDB
- powermetrics mac
title: Monitoring Power Usage and Efficiency of M1 Mac CPU/GPU
toc: true
---

## Unlocking Power Metrics on Your M1 Mac

The Apple M1 chip has revolutionized the personal computing landscape with its incredible performance and power efficiency. As a proud owner of a 2021 MacBook Pro 16-inch with the M1 Pro, I can attest to its capabilities. My daily development workflow has never been smoother, and the battery life is simply phenomenal, easily lasting 10-12 hours on a single charge, a significant improvement over my previous Intel-based MacBook Pro.

One of the most impressive aspects of the M1 architecture is its sustained performance, whether plugged in or on battery. This inspired me to delve deeper and quantify the power consumption of the M1 Pro's CPU, GPU, and DRAM. In this guide, I'll walk you through the process of setting up a monitoring system to visualize these metrics in real-time using a combination of built-in macOS tools and open-source software.

### Prerequisites

Before we begin, ensure you have the following:

*   **An M1-based Mac:** This guide is specifically tailored for Apple Silicon Macs.
*   **Homebrew:** A package manager for macOS. If you don't have it installed, you can follow the instructions at [brew.sh](https://brew.sh/).
*   **Python 3:** macOS comes with Python 3 pre-installed.
*   **Basic command-line knowledge:** Familiarity with the terminal is recommended.

### The Monitoring Stack

Our monitoring setup will consist of the following components:

1.  ***`powermetrics`***: A powerful command-line utility built into macOS that provides detailed power-related metrics.
2.  **InfluxDB**: A high-performance, open-source time-series database to store our power metrics.
3.  **Python 3**: To write a script that reads data from `powermetrics` and writes it to InfluxDB.
4.  **InfluxDB UI**: To visualize the collected data in a dashboard.

### Step 1: Installing and Configuring InfluxDB

First, we need to install InfluxDB using Homebrew:

```bash
brew install influxdb
```

Once the installation is complete, start the InfluxDB service:

```bash
brew services start influxdb
```

You should see a confirmation message that the service has started successfully. By default, InfluxDB runs on port `8086`. You can verify that it's running by navigating to `http://localhost:8086` in your web browser.

You'll be greeted with the InfluxDB setup page. Follow the on-screen instructions to create a user, password, organization, and a bucket to store your data. For this guide, I'll name my bucket `mac-metrics-tsd`.

Finally, you'll need to generate an API token to allow our Python script to write data to the database. Navigate to the "API Tokens" tab in the InfluxDB UI and generate a new token with write access to your bucket.

### Step 2: The Python Scraper

Next, we'll write a Python script to collect the power metrics. This script will use the `influxdb-client` library to communicate with our InfluxDB instance.

First, install the library using `pip`:

```bash
pip3 install influxdb-client
```

Now, create a new file named `python-metrics-daemon.py` and add the following code:

```python
from datetime import datetime
import subprocess
import sys

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# --- InfluxDB Configuration ---
TOKEN = "YOUR_API_TOKEN"
ORG = "YOUR_ORG_ID"
BUCKET = "mac-metrics-tsd"
# ------------------------------

client = InfluxDBClient(url="http://localhost:8086", token=TOKEN, org=ORG)
write_api = client.write_api(write_options=SYNCHRONOUS)

# Command to run powermetrics
command = "/usr/bin/powermetrics -i 300 --samplers cpu_power -a --hide-cpu-duty-cycle"

process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, bufsize=3, text=True)

while True:
    line = process.stdout.readline()
    if not line and process.poll() is not None:
        break
    if ' Power: ' in line:
        metric, value = line.strip().split(' Power: ')
        point = Point(metric) \
            .tag("host", "m1-macbook-pro") \
            .field("power", int(value.replace('mW', ''))) \
            .time(datetime.utcnow(), WritePrecision.NS)

        write_api.write(BUCKET, ORG, point)
        print(f"Writing: {metric} - {value}")
        sys.stdout.flush()
```

**Remember to replace `YOUR_API_TOKEN` and `YOUR_ORG_ID` with your actual InfluxDB credentials.**

This script does the following:

1.  **Connects to InfluxDB:** It initializes the InfluxDB client with your credentials.
2.  **Runs `powermetrics`:** It starts the `powermetrics` command as a subprocess and captures its output.
3.  **Parses the output:** It reads the output line by line, and for lines containing " Power: ", it extracts the metric name (e.g., "CPU Power", "GPU Power") and its value.
4.  **Writes to InfluxDB:** It creates a data point and writes it to your InfluxDB bucket.

Now, run the script with `sudo` to grant it the necessary permissions to access `powermetrics`:

```bash
sudo python3 python-metrics-daemon.py
```

You should see output in your terminal indicating that data is being written to InfluxDB.

### Step 3: Visualizing the Data in InfluxDB

With data flowing into our database, it's time to create a dashboard to visualize it.

1.  **Open the InfluxDB UI:** Navigate to `http://localhost:8086`.
2.  **Go to the "Boards" (Dashboards) section:** Create a new dashboard.
3.  **Add a new cell:** We'll create three cells, one for each metric: CPU, GPU, and Package Power.
4.  **Configure the cells:** For each cell, use the "Gauge" visualization. Then, use the following Flux queries to fetch the data.

**CPU Power (in Watts):**

```flux
from(bucket: "mac-metrics-tsd")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "CPU")
  |> map(fn: (r) => ({ r with _value: float(v:r._value)/1000.00}))
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "last")
```

**GPU Power (in Watts):**

```flux
from(bucket: "mac-metrics-tsd")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "GPU")
  |> map(fn: (r) => ({ r with _value: float(v:r._value)/1000.00}))
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "last")
```

**Package Power (in Watts):**

```flux
from(bucket: "mac-metrics-tsd")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "Package")
  |> map(fn: (r) => ({ r with _value: float(v:r._value)/1000.00}))
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "last")
```

These queries do the following:

*   **Fetch data from your bucket:** `from(bucket: "mac-metrics-tsd")`
*   **Filter by time range and measurement:** `range(...)` and `filter(...)`
*   **Convert from mW to W:** `map(...)`
*   **Aggregate the data:** `aggregateWindow(...)`

Save your dashboard. You should now see three gauges displaying the real-time power consumption of your M1 Mac's CPU, GPU, and the entire SoC package.

### Results and Observations

I let the monitoring system run while performing various tasks, and here are some interesting observations:

| Workload          | CPU Power (W) | GPU Power (W) | Package Power (W) |
| ----------------- | ------------- | ------------- | ----------------- |
| Idle              | ~0.1          | ~0.02         | ~2.1              |
| Code Compilation  | ~10-15        | ~0.5          | ~15-20            |
| Video Transcoding | ~5-8          | ~10-12        | ~20-25            |

These results clearly demonstrate the M1 Pro's remarkable power efficiency. Even under heavy load, the power consumption is significantly lower than comparable Intel-based systems, all while maintaining a silent and cool operation.

### Conclusion

By leveraging the power of `powermetrics`, InfluxDB, and Python, we've created a robust system for monitoring the power consumption of the M1 Mac. This setup provides valuable insights into the performance and efficiency of Apple's custom silicon and can be extended to monitor other metrics as well.

I encourage you to experiment with this setup and explore the vast amount of data that `powermetrics` provides. Happy monitoring!
