---
title: Write a simple code in R to perform Polynomial Regression
date: Last Modified
permalink: /Write-a-simple-code-in-R-to-perform-Polynomial-Regression/index.html
comments: 0
eleventyNavigation:
  key: Write a simple code in R to perform Polynomial Regression
  title: Write a simple code in R to perform Polynomial Regression
  order: 22
---

```R
# Load the ggplot2 library
library(ggplot2)

# Generate sample data
set.seed(123)
x <- seq(-3, 3, length.out = 50)  # Independent variable
y <- 2*x^2 - 3*x + rnorm(50, mean = 0, sd = 3)  # Dependent variable with noise

# Perform polynomial regression
degree <- 2  # Degree of the polynomial
model <- lm(y ~ poly(x, degree, raw = TRUE))

# Predictions from the model
x_pred <- seq(min(x), max(x), length.out = 100)
y_pred <- predict(model, newdata = data.frame(x = x_pred))

# Plot the data and the regression curve
ggplot() +
  geom_point(data = data.frame(x = x, y = y), aes(x, y)) +
  geom_line(data = data.frame(x = x_pred, y = y_pred), aes(x, y), color = "red") +
  labs(title = "Polynomial Regression",
       x = "x",
       y = "y") +
  theme_minimal()
```

In this code:

1. We generate sample data where `x` is a sequence of numbers from -3 to 3, and `y` is calculated using a quadratic polynomial equation with some added noise.

2. We perform polynomial regression using the `lm()` function. The `poly()` function is used to create polynomial terms for the independent variable `x`. Setting `raw = TRUE` ensures that the polynomial terms are orthogonalized.

3. We make predictions for `y` using the polynomial regression model for a sequence of `x` values (`x_pred`).

4. Finally, we plot the original data points and the regression curve using `ggplot2`. The `geom_point()` function adds the data points, while `geom_line()` adds the regression curve.
