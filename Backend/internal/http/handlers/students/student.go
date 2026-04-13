package students

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/TusharChoudharykp/Students-API/internal/storage"
	"github.com/TusharChoudharykp/Students-API/internal/types"
	"github.com/TusharChoudharykp/Students-API/internal/utils/response"
	"github.com/go-playground/validator"
)

func New(storage storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		slog.Info("creating a student")

		var students types.Student

		err := json.NewDecoder(r.Body).Decode(&students)
		if errors.Is(err, io.EOF) {
			response.Writejson(w, http.StatusBadRequest, response.GeneralError(err))
			return
		}

		if err != nil {
			response.Writejson(w, http.StatusBadRequest, response.GeneralError(err))
			return 
		}
		
		
		// request validation

		if err := validator.New().Struct(students); err != nil {

			validateErrs := err.(validator.ValidationErrors)
			response.Writejson(w, http.StatusBadRequest, response.ValidationError(validateErrs))
			return 
		}

		lastId, err := storage.CreateStudent(
			students.Name,
			students.Email,
			students.Age,
		)

		slog.Info("user created successfully", slog.String("userId", fmt.Sprint(lastId)))

		if err != nil {
			response.Writejson(w, http.StatusInternalServerError, err)
			return 
		}

		response.Writejson(w, http.StatusCreated, map[string]int64{"id": lastId})
		//w.Write([]byte("Hello, Students API!"))
	}
}



func GetById(storage storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		slog.Info("getting a student", slog.String("id", id))

		intId, err := strconv.ParseInt(id, 10, 64) 
		if err != nil {
			response.Writejson(w, http.StatusBadRequest, response.GeneralError(err))
			return
		}

		students, err := storage.GetStudentById(intId)

		if err != nil {
			slog.Error("error getting user", slog.String("id", id))
			response.Writejson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		response.Writejson(w, http.StatusOK, students)
	}
}



func GetAllId(storage storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		slog.Info("getting all students")

		students, err := storage.GetAllStudents()
		if err != nil {
			slog.Error("error getting students")
			response.Writejson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		response.Writejson(w, http.StatusOK, students)
	}
}
