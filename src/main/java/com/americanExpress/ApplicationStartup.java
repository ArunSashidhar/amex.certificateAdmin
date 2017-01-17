package com.americanExpress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;


@SpringBootApplication
public class ApplicationStartup extends SpringBootServletInitializer {

	// This is for deploying war
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ApplicationStartup.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(ApplicationStartup.class, args);
	}

}
