package main

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	config "github.com/TusharChoudharykp/Students-API/internal"
	"github.com/TusharChoudharykp/Students-API/internal/http/handlers/students"
	"github.com/TusharChoudharykp/Students-API/internal/http/middlewares"
	sqlite "github.com/TusharChoudharykp/Students-API/internal/storage/Sqlite"
)

func main() {
	// Load configuration
	cfg := config.MustLoadConfig()

	//database setup
	storage, err := sqlite.New(cfg)
	if err != nil {
		log.Fatal(err)
	}

	slog.Info("storage initialized", slog.String("env", cfg.Env), slog.String("version", "1.0.0"))

	//setup router
	router := http.NewServeMux()

	router.HandleFunc("POST /api/students", students.New(storage))
	router.HandleFunc("GET /api/students/{id}", students.GetById(storage))
	router.HandleFunc("GET /api/students", students.GetAllId(storage))

	//wrap with your existing CORS middleware
	server := http.Server{
		Addr: cfg.Addr,
		Handler: middlewares.CORS(router),
	}
	
	slog.Info("Server Started", slog.String("address", cfg.Addr))

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func(){
		err := server.ListenAndServe()
		if err != nil {
			log.Fatalf("Failed to start server: %s", err)
		}
	}()

	<-done
	
	slog.Info("shutting down the server")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = server.Shutdown(ctx)
	if err != nil {
		slog.Error("failed to shutdown server", slog.String("error", err.Error()))
	}

	slog.Info("server stopped successfully")
}