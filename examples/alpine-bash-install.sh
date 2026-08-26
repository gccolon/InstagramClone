#!/bin/sh

# Example: Installing bash on Alpine Linux
# This script demonstrates the typical workflow for adding bash to Alpine

echo "Installing bash on Alpine Linux..."
echo ""

# Method 1: Using sudo (for non-root users)
echo "Method 1: Using sudo apk add bash"
echo "Command: sudo apk add bash"
echo ""

# Method 2: Using apk directly (for root users)
echo "Method 2: Using apk add bash (as root)"
echo "Command: apk add bash"
echo ""

# Method 3: With additional options
echo "Method 3: With --no-cache option (recommended for Docker)"
echo "Command: sudo apk add --no-cache bash"
echo ""

echo "After installation, you can switch to bash by running:"
echo "  bash"
echo ""
echo "To make bash your default shell:"
echo "  chsh -s /bin/bash"
