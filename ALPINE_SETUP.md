# Alpine Linux Setup Guide

This directory contains files for setting up and running the Instagram Clone project on Alpine Linux.

## Files

- **Dockerfile.alpine** - A Dockerfile based on Alpine Linux with bash installed
- **setup-alpine-bash.sh** - A bash script to install bash on Alpine Linux systems

## Using the Alpine Dockerfile

The `Dockerfile.alpine` provides a minimal Alpine Linux environment with bash and sudo pre-installed.

### Build the Docker image:

```bash
docker build -f Dockerfile.alpine -t instagram-clone-alpine .
```

### Run the container:

```bash
docker run -it instagram-clone-alpine
```

## Using the Setup Script

The `setup-alpine-bash.sh` script automates the installation of bash on Alpine Linux systems.

### Make the script executable (if not already):

```bash
chmod +x setup-alpine-bash.sh
```

### Run the script:

```bash
# If you have sudo privileges:
./setup-alpine-bash.sh

# If running as root:
./setup-alpine-bash.sh
```

## Manual Installation

If you prefer to install bash manually on Alpine Linux:

```bash
# Update package index
sudo apk update

# Install bash
sudo apk add bash

# Optionally, install other useful packages
sudo apk add bash-completion bash-doc
```

## Why Alpine Linux?

Alpine Linux is a security-oriented, lightweight Linux distribution based on musl libc and busybox. It's popular for:

- **Small size**: Base images are typically under 5MB
- **Security**: Proactive security features
- **Simplicity**: Simple package management with apk
- **Docker**: Widely used for Docker containers

## Package Manager: apk

Alpine Linux uses `apk` (Alpine Package Keeper) as its package manager:

```bash
# Update package index
apk update

# Install a package
apk add <package-name>

# Remove a package
apk del <package-name>

# Search for packages
apk search <keyword>

# List installed packages
apk list --installed
```

## Common Packages for Development

```bash
# Install common development tools
sudo apk add bash git nodejs npm python3 curl wget

# Install build tools
sudo apk add build-base gcc g++ make

# Install text editors
sudo apk add vim nano
```

## Notes

- Alpine Linux uses `ash` (Almquist shell) as the default shell, not bash
- Many scripts require bash, so installing it is often necessary
- The `--no-cache` flag prevents caching of the package index, keeping images smaller
- Use `sudo` when running as a non-root user, or run commands directly as root

## Troubleshooting

### "sudo: command not found"

If sudo is not installed:

```bash
# As root:
apk add sudo

# Configure sudo for your user:
echo "username ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
```

### "bash: command not found"

Run the setup script or install bash manually:

```bash
apk add bash
```

## Resources

- [Alpine Linux Official Website](https://alpinelinux.org/)
- [Alpine Linux Wiki](https://wiki.alpinelinux.org/)
- [apk Package Manager Documentation](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management)
