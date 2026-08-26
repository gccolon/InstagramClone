#!/bin/bash

# Alpine Linux Setup Script
# This script demonstrates installing bash on Alpine Linux using apk

echo "================================================"
echo "Alpine Linux - Bash Installation Script"
echo "================================================"
echo ""

# Check if running on Alpine Linux
if [ -f /etc/alpine-release ]; then
    echo "✓ Detected Alpine Linux version: $(cat /etc/alpine-release)"
    echo ""
    
    # Check if running as root
    if [ "$EUID" -eq 0 ]; then
        echo "Running as root, using apk directly..."
        apk update
        apk add --no-cache bash
    else
        echo "Running as non-root user, using sudo..."
        # Update package index
        echo "→ Updating package index..."
        sudo apk update
        
        # Install bash
        echo "→ Installing bash..."
        sudo apk add --no-cache bash
    fi
    
    echo ""
    echo "✓ Bash installation complete!"
    echo "  Bash version: $(bash --version | head -n 1)"
    echo ""
    echo "You can now use bash by running: bash"
    
else
    echo "⚠ Warning: This script is designed for Alpine Linux"
    echo "  Current system does not appear to be Alpine Linux"
    echo ""
    echo "For other distributions, use:"
    echo "  - Debian/Ubuntu: sudo apt-get install bash"
    echo "  - RedHat/CentOS: sudo yum install bash"
    echo "  - Fedora: sudo dnf install bash"
fi

echo ""
echo "================================================"
