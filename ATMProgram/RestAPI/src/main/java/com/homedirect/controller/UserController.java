package com.homedirect.controller;

import com.homedirect.common.model.CommonResponse;
import com.homedirect.repo.auth.UserAuthentication;
import com.homedirect.repo.model.response.UserProfileResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ducanh
 * email : anh.phamduc@homedirect.com.vn
 * created: 12/10/2018
 */
@RestController
@RequestMapping("/authentication")
public class UserController {
    @GetMapping("/profiles")
    public CommonResponse<Object> getProfile(UserAuthentication authentication) {
        return new CommonResponse<Object>(){{
            setCode(100);
            setData(authentication.getPrincipal());
            setMessage("Thanhf coong");
        }};
    }
}
