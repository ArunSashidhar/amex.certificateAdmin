package com.americanExpress.exceptions;

public class DuplicateSubmissionException extends RuntimeException {

    private long applicationId;

    public DuplicateSubmissionException(Long applicationId){
        super("Application with id: " + applicationId + " was already submitted");
        this.applicationId = applicationId;
    }

    public long getApplicationId() {return applicationId;}


}
