package com.example.studentinternship.configuration;

import com.example.studentinternship.model.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;
import java.util.Optional;

public class SecurityHelper {

    public static String getUserId() {
        return getPrincipal()
                .map(User.class::cast)
                .map(user -> user.getId())
                .orElse(null);
    }

    private static Optional<Object> getPrincipal() {
        var authorization = SecurityContextHolder.getContext().getAuthentication();
        if (authorization instanceof UsernamePasswordAuthenticationToken token) {
            return Optional.of(token.getPrincipal());
        }
        return Optional.empty();
    }

    private static Optional<Collection<GrantedAuthority>> getUserAuthorities() {
        var authorization = SecurityContextHolder.getContext().getAuthentication();
        if (authorization instanceof UsernamePasswordAuthenticationToken token) {
            return Optional.of(token.getAuthorities());
        }
        return Optional.empty();
    }

    public static void checkUserHasReadPermission(String userId) throws RuntimeException {
        var loggedUserId = getUserId();
        if (!userId.equals(loggedUserId)) {
            getUserAuthorities()
                    .map(authorities -> true
//                            !authorities.contains(new SimpleGrantedAuthority(Role.STUDENT.name()))
                    )
                    .orElseThrow(() -> new RuntimeException("Information unavailable!"));
        }
    }

    public static void checkUserHasWritePermission(String userId) throws RuntimeException {
        var loggedUserId = getUserId();
        if (!userId.equals(loggedUserId)) {
            throw  new RuntimeException("Information unavailable!");
        }
    }
}
