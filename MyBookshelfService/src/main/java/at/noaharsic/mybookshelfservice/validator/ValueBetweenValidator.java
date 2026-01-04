package at.noaharsic.mybookshelfservice.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValueBetweenValidator implements ConstraintValidator<ValueBetween, Integer> {
    int min;
    int max;

    @Override
    public void initialize(ValueBetween constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(Integer integer, ConstraintValidatorContext constraintValidatorContext) {
        return integer >= this.min && integer <= this.max;
    }
}
