import org.junit.Test;
import stringreverse.IndividualStringRecursiveReverser;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class AnIndividualStringRecursiveReverser {

    @Test
    public void shouldReverseHello(){
        String forward = "hello";
        String reverse = "olleh";

        assertThat(IndividualStringRecursiveReverser.reverse(forward), is(reverse));
    }

    @Test
    public void shouldReverseTheGivenSimpleString(){
        String forward = "hello world";
        String reverse = "olleh dlrow";

        assertThat(IndividualStringRecursiveReverser.reverse(forward), is(reverse));
    }

    @Test
    public void shouldReverseTheStringAndKeepTheSpacesAndQuotes(){
        String forward = "hell \"o\"    world   ";
        String reverse = "lleh \"o\"    dlrow   ";

        assertThat(IndividualStringRecursiveReverser.reverse(forward), is(reverse));
    }

    @Test
    public void shouldReverseTheGivenComplicatedString(){
        String forward = "\"--------- \"my career stack\" ---------\"";
        String reverse = "\"--------- \"ym reerac kcats\" ---------\"";

        assertThat(IndividualStringRecursiveReverser.reverse(forward), is(reverse));
    }
}
