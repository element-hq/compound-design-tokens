#!/bin/bash

# Exit early when any error is found
set -e

# Download
curl -L "https://github.com/element-hq/compound-svg2xml/releases/download/v$1/svg2xml-$1.zip" > svg2xml.zip
unzip svg2xml.zip
chmod +x svg2xml-$1/bin/svg2xml