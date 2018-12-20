# Graphme
Graphme node server a quick cpu usage graphing server.

# Prerequisites
Node
NPM

# Usage

-```git clone https://github.com/DemetryRomanowski/Graphme.git```

-```cd graphme```

-```npm install```

-```node app.js```

[http://localhost:8080](http://localhost:8080)

# To modify Ports, Refresh interval, and graphing length.

Open app.js in an editor and modify: 

```let TIMEOUT = 1000;``` Where the value is how many ms before it updates. 

```let GRAPH_SIZE = 10;``` And this value is how many points to graph on the x axis. 

```let PORT = 8080;``` This is the port you can put this to any port you want.

# Planned features

1. Add more features (memory, selectable processes, disk usage etc)
2. Configuration system
3. Multiple server handling
4. Database to have a historian
5. Alarms
6. Remote notifications
