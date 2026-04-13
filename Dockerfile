
# STAGE 1: Builder

# Step 1: Use Go alpine image as builder
FROM golang:1.26-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependency files first (layer caching)
COPY go.mod go.sum ./

# Step 4: Download all dependencies
RUN go mod download

# Step 5: Copy only required source folders
COPY cmd/ ./cmd/
COPY internal/ ./internal/
COPY config/ ./config/

# Step 6: Build the binary (pure Go, Linux target, strip debug info)
RUN CGO_ENABLED=0 GOOS=linux go build \
    -ldflags="-s -w" \
    -o students-api \
    ./cmd/student-api/


# STAGE 2: Production

# Step 7: Use minimal alpine as final base (no Go toolchain)
FROM alpine:3.19 AS production

# Step 8: Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Step 9: Set working directory
WORKDIR /app

# Step 10: Copy only the binary from builder stage
COPY --from=builder /app/students-api .

# Step 11: Copy config file from builder stage
COPY --from=builder /app/config/local.yaml ./config/local.yaml

# Step 12: Create storage directory for SQLite and set permissions
RUN mkdir -p /app/storage && chown -R appuser:appgroup /app

# Step 13: Switch to non-root user
USER appuser

# Step 14: Expose app port
EXPOSE 8080

# Step 15: Run the binary
CMD ["./students-api", "-config", "config/local.yaml"]