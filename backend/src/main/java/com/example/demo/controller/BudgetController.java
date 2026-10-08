package com.example.demo.controller;

import com.example.demo.entity.Budget;
import com.example.demo.entity.User;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(budgetRepository.findByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<Budget> createOrUpdateBudget(@RequestBody Budget budgetRequest) {
        User user = getAuthenticatedUser();
        
        Budget budget = budgetRepository.findByUserIdAndMonthAndYear(user.getId(), budgetRequest.getMonth(), budgetRequest.getYear())
                .orElse(new Budget());
                
        budget.setUser(user);
        budget.setMonth(budgetRequest.getMonth());
        budget.setYear(budgetRequest.getYear());
        budget.setTotalBudget(budgetRequest.getTotalBudget());

        return ResponseEntity.ok(budgetRepository.save(budget));
    }
}
