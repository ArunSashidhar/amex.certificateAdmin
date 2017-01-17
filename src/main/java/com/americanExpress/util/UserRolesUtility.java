package com.amex.pranav.util;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class UserRolesUtility {

    public List<String> getRolesFromPrincipal(Principal principal) {
        List<String> roles = new ArrayList<String>();
        if (principal instanceof UsernamePasswordAuthenticationToken) {

            Collection<? extends GrantedAuthority> authorities = ((UsernamePasswordAuthenticationToken) principal)
                    .getAuthorities();

            for (GrantedAuthority authority : authorities) {
                roles.add(authority.getAuthority());
            }
        }
        return roles;
    }

}
