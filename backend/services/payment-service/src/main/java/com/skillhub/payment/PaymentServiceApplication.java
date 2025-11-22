package com.skillhub.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@SpringBootApplication
@RestController
public class PaymentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceApplication.class, args);
	}

	@GetMapping("/health")
	public Map<String, String> health() {
		return Map.of("status", "up", "service", "payment-service");
	}
}
