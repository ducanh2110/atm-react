package com.homedirect.processor.impl;

import java.util.List;

import com.homedirect.repo.service.UserService;
import com.homedirect.repo.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homedirect.entity.Account;
import com.homedirect.entity.Page;
import com.homedirect.exception.ATMException;
import com.homedirect.processor.AccountProcessor;
import com.homedirect.request.AccountRequest;
import com.homedirect.request.ChangePassRequest;
import com.homedirect.request.SearchAccountRequest;
import com.homedirect.response.AccountResponse;
import com.homedirect.service.AccountService;
import com.homedirect.transformer.AccountTransformer;
import com.homedirect.validator.ATMInputValidator;

@Service
public class AccountProcessorImpl implements AccountProcessor {
	private @Autowired AccountService accountService;
	private @Autowired AccountTransformer transformer;
	private @Autowired ATMInputValidator validatorInputATM;

	@Override
	public AccountResponse login(AccountRequest request) throws ATMException {
		Account account = accountService.login(request);
		return transformer.toResponse(account);
	}

	public AccountResponse create(AccountRequest request) throws ATMException {
		validatorInputATM.isValidCreateAccount(request.getUsername(), request.getPassword());
		Account account = accountService.creatAcc(request);
		return transformer.toResponse(account);
	}

	@Override
	public AccountResponse update(AccountRequest request) throws ATMException {
		Account account = accountService.editAcc(request);
		return transformer.toResponse(account);
	}

	public List<AccountResponse> findAll() {
		List<Account> accounts = accountService.findAll();
		return transformer.toResponseList(accounts);
	}

	@Override
	public AccountResponse get(int id) throws ATMException {
		Account account = accountService.findById(id);
		return transformer.toResponse(account);
	}

	@Override
	public void delete(int id) throws ATMException {
		accountService.deleteAcc(id);
	}

	@Override
	public AccountResponse changePassword(ChangePassRequest changePassRequest) throws ATMException {
		Account account = accountService.changePassword(changePassRequest);
		return transformer.toResponse(account);
	}

//	đổi từ kiểu trả về Page<Account> thành Page<AccountResponse>
	@Override
	public Page<AccountResponse> search(SearchAccountRequest request) throws ATMException {
		return transformer.toResponse(accountService.search(request.getUsername(), request.getPageNo(), request.getPageSize()));
	}
}
