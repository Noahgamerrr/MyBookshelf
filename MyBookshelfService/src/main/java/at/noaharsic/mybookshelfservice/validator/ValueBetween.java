package at.noaharsic.mybookshelfservice.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValueBetweenValidator.class)
public @interface ValueBetween {
    int min() default 1;
    int max() default 5;
    String message() default "Number must be between 1 and 5";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
