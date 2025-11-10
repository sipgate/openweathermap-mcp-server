#!/bin/bash
# Start the OpenWeather MCP server using Docker, binding to port 8080

docker build -t openweather-mcp-server .
docker run --rm -p 8080:3000 openweather-mcp-server
