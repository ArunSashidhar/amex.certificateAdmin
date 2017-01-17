package com.americanExpress.web;


import com.americanExpress.exceptions.DuplicateSubmissionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class GlobalControllerAdvice {
    Logger LOGGER = LoggerFactory.getLogger(GlobalControllerAdvice.class);

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value =  HttpStatus.BAD_REQUEST, reason = "Form already submitted")
    public void duplicateSubmission(DuplicateSubmissionException e){
        LOGGER.error("This form was already submitted for application id: " + e.getApplicationId());
    }

}
