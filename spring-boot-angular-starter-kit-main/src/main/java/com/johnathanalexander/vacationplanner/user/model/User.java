package com.johnathanalexander.vacationplanner.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.johnathanalexander.vacationplanner.admin.model.Role;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.auth.model.ActivationToken;
import com.johnathanalexander.vacationplanner.auth.model.BlacklistedToken;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, name = "first_name", nullable = false)
    private String firstName;

    @Column(length = 50, name = "last_name", nullable = false)
    private String lastName;

    @Column(length = 100, unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "role_user",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<ActivationToken> activationTokens;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<BlacklistedToken> blacklistedTokens;

    //TODO To be removed
    @NotEmpty
    @Column(name = "locale", nullable = false, length = 2)
    private String locale = Locale.ENGLISH.value;

    private boolean accountLocked;

    private boolean enabled;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;
    
    /*@OneToMany(mappedBy = "owner", fetch=FetchType.LAZY)
    private Set<Vacation> vacations = new HashSet<>();

    public Set<Vacation> getVacations() {
		return vacations;
	}

	public void setVacations(Set<Vacation> vacations) {
		this.vacations = vacations;
	}
    
    
    @Override
    public String toString() {
    	String v = "";
    	
    	List<Vacation> list = new ArrayList<>(this.vacations);
    	
    	for(int c = 0; c < list.size(); c++) {
    		Vacation vacation = list.get(c);
    		v += vacation.toString();
    	}
    	
    	return "id=" + this.id + " / email=" + this.email + " / vacationLength: " + this.vacations.size() + " / vacations=" + this.vacations.toString();
    }*/

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<ActivationToken> getActivationTokens() {
        return activationTokens;
    }

    public void setActivationTokens(Set<ActivationToken> activationTokens) {
        this.activationTokens = activationTokens;
    }

    public Set<BlacklistedToken> getBlacklistedTokens() {
        return blacklistedTokens;
    }

    public void setBlacklistedTokens(Set<BlacklistedToken> blacklistedTokens) {
        this.blacklistedTokens = blacklistedTokens;
    }

    public @NotEmpty String getLocale() {
        return locale;
    }

    public void setLocale(@NotEmpty String locale) {
        this.locale = locale;
    }

    public boolean isAccountLocked() {
        return accountLocked;
    }

    public void setAccountLocked(boolean accountLocked) {
        this.accountLocked = accountLocked;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .flatMap(role -> role.getAuthorities().stream())
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
