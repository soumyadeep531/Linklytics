package com.url.shortener;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:testdb",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
		"jwt.secret=testsecret123456789012345678901234567890",
		"jwt.expiration=3600000",
		"frontend.url=http://localhost:3000"
})
class UrlShortenerSbApplicationTests {

	@Test
	void contextLoads() {
	}

}
