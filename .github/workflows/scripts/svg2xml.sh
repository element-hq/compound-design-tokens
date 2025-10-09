#!/bin/bash

# Exit early when any error is found
set -e

# Download
curl -L "https://github.com/element-hq/compound-svg2xml/releases/download/v$1/svg2xml-$1.zip" > svg2xml.zip
unzip svg2xml.zip
chmod +x svg2xml-$1/bin/svg2xml

snake_case() {
	# Find the 'words' (groups of either letters or numbers)
	words=($(echo $1 | grep -oE '[a-zA-Z]+|[0-9]+'))
	# Then join them with `_`
	echo $(IFS=_; echo "${words[*]}")
}

for icon in $(ls icons/*.svg); do
	echo "Transforming $icon to Android XML format"
	# Remove the dir part
	dest=${icon/icons\//}
	# Remove extension
	dest=${dest/.svg/}
	# Make sure it's snake case
	dest=$(snake_case $dest)
	svg2xml-$1/bin/svg2xml $icon assets/android/res/drawable/ic_compound_$dest.xml
done