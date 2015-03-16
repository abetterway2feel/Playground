import org.junit.Test;
import stringreverse.IndividualStringRecursiveReverser;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class AnIndividualStringRecursiveReverser {

    @Test
    public void shouldReverseTheGivenSimpleString(){
        String forward = "hello world";
        String reverse = "olleh dlrow";

        System.out.println(forward);
        System.out.println(reverse);
        assertThat(IndividualStringRecursiveReverser.reverse(forward), is(reverse));
    }

    @Test
    public void shouldReverseTheGivenString(){
        String forward = "\"--------- \"my career stack\" ---------\"";
        String reverse = "\"--------- \"ym reerac kcats\" ---------\"";

        System.out.println(forward);
        System.out.println(reverse);
        assertThat(IndividualStringRecursiveReverser.reverse(forward), is(reverse));
    }
}
