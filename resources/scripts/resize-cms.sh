#!/bin/bash

# Directory where your images are located
directory="packages/website/public/static/cms"

# Maximum width and height
max_width=640
max_height=360

# Find all JPEG and PNG files in the directory and its subdirectories
find "$directory" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 |
while IFS= read -r -d $'\0' file; do
    # Get the current image dimensions
    current_width=$(identify -format "%w" "$file")
    current_height=$(identify -format "%h" "$file")

    # Calculate the new dimensions while maintaining aspect ratio
    if [ "$current_width" -gt "$max_width" ] || [ "$current_height" -gt "$max_height" ]; then
        convert "$file" -resize "${max_width}x${max_height}>" "$file"
        echo "Resized: $file"
    else
        echo "Skipped: $file (already within limits)"
    fi
done
