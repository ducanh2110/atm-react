package com.homedirect;

import com.homedirect.repo.auth.AuthFilter;
import com.homedirect.repo.auth.LoginFilter;
import com.homedirect.repo.auth.LogoutAuth;
import com.homedirect.repo.security.RepoSecurityConfigurerAdapter;
import org.apache.http.client.HttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 *
 * @author: ducdd
 * @created: Aug 1, 2018
 *
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends RepoSecurityConfigurerAdapter {

	@Autowired
	public SecurityConfig(HttpClient httpClient, Environment env) {
		super("HDR", httpClient, env);
	}

	@Override
	public LoginFilter createLoginFilter() {
		return new LoginFilter(tokenAuthenticationService, new AntPathRequestMatcher("/login"));
	}

	@Override
	public LogoutFilter createLogoutFilter() {
		return new LogoutAuth(tokenAuthenticationService, request -> true);
	}

	public AuthFilter createAuthFilter() {
		return new AuthFilter(tokenAuthenticationService, request -> true);
	}

}
