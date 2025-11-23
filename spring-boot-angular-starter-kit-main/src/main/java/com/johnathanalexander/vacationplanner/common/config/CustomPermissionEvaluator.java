package com.johnathanalexander.vacationplanner.common.config;

import com.johnathanalexander.vacationplanner.TODO;
import com.johnathanalexander.vacationplanner.user.model.User;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Optional;

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

    //private final PostRepository postRepository;
    //private final CommentRepository commentRepository;

   // public CustomPermissionEvaluator(PostRepository postRepository, CommentRepository commentRepository) {
        //this.postRepository = postRepository;
        //this.commentRepository = commentRepository;
   // }
	
	public CustomPermissionEvaluator() {
		
	}

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {

        if (authentication == null || !(targetDomainObject instanceof String) || !(permission instanceof String)) {
            return false;
        }

        User user = (User) authentication.getPrincipal();

        String resource = targetDomainObject.toString();
        String action = permission.toString();

        // Check if the user has a role with the required permission
        return user.getRoles().stream().anyMatch(role ->
                role.getPermissions().stream().anyMatch(perm ->
                        resource.equals(perm.getResource()) && action.equals(perm.getAction())
                )
        );
    }

    @Override
    @TODO("Look into this and evaluate its usefulness")
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        if (authentication == null || !(targetId instanceof Long) || targetType == null || permission == null) {
            return false;
        }

        User user = (User) authentication.getPrincipal();
        /*case "POST" -> isPostAuthor(user, targetId);
        case "COMMENT" -> isCommentAuthor(user, targetId);
        default -> false;*/

        
        return switch (targetType.toUpperCase()) {
        	case "ANY" -> true;
        	default -> false;
        };
    }
}
