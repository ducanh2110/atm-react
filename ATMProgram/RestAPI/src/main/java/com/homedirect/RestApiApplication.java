package com.homedirect;

import org.apache.http.client.HttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@ImportResource("classpath:application-config.xml")
@EnableScheduling
@EnableAutoConfiguration(exclude = {
		SecurityAutoConfiguration.class })
public class RestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestApiApplication.class, args);
	}

	@Bean(name = "restTemplate")
	@Autowired
	public RestTemplate createRestTemplate(HttpClient httpClient) {
		return new RestTemplate(new HttpComponentsClientHttpRequestFactory(httpClient));
	}

	@Bean(name = "userRepoTemplate")
	public RestTemplate getUserRepoTemplate(@Qualifier("restTemplate") RestTemplate restTemplate) {
		return restTemplate;
	}
}
