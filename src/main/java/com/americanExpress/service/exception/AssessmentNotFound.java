package com.amex.pranav.service.exception;

public class AssessmentNotFound extends RuntimeException {

    public AssessmentNotFound(){}

    public AssessmentNotFound (String message) {super(message);}

    public AssessmentNotFound (String message, Throwable cause){super(message,cause);}
}
