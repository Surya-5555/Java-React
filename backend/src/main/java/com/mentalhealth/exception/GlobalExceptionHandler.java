package com.mentalhealth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleNotFound(NoSuchElementException ex){
        Map<String,String> m = new HashMap<>();
        m.put("error", "Resource not found");
        return new ResponseEntity<>(m, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex){
        Map<String,String> m = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> m.put(err.getField(), err.getDefaultMessage()));
        return new ResponseEntity<>(m, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAll(Exception ex){
        Map<String,String> m = new HashMap<>();
        m.put("error", ex.getMessage());
        return new ResponseEntity<>(m, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
