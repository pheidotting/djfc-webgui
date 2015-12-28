package nl.dias.commons.test;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, ANNOTATION_TYPE, PACKAGE, TYPE_PARAMETER})
//, TYPE_USE})
@Retention(RetentionPolicy.SOURCE)
public @interface TestCase {
    enum Testcase {
        DJFC0, DJFC150, DJFC151, DJFC152, DJFC153, DJFC154, DJFC155, DJFC156, DJFC157, DJFC158, DJFC159, DJFC160, DJFC161;

        public String getTekst() {
            return name().replace("DJFC", "DJFC-");
        }
    }

    Testcase TESTCASE() default Testcase.DJFC0;
}
