package com.homedirect.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String accountNumber;
	private String username;
	private String password;
	private Double amount;
	
	public static class Constant {
		public final static int USERNAME_LENG = 5;
		public final static int PASSWORD_LENG = 6;
		public final static double DEFAULT_AMOUNT = 50000;
	}

}
