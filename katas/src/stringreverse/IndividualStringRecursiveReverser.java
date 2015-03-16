package stringreverse;

import java.text.StringCharacterIterator;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class IndividualStringRecursiveReverser {
    private static LinkedList<Character> separators;

    static {
        separators = new LinkedList<Character>();
        separators.add('"');
        separators.add(' ');
    }

    private static String reverseStringPreserveChar(String forward, List<Character> separators) {
        String reverse = "";
        String currentWord = "";
        StringCharacterIterator iterator = new StringCharacterIterator(forward);
        char nextChar = iterator.current();
        do{
            if (separators.contains(nextChar) || iterator.getIndex() == iterator.getEndIndex()) {
                if (currentWord.length() > 0) {
                    reverse = reverse + reverse(currentWord);
                    currentWord = "";
                }
                reverse = reverse + nextChar;
            } else {
                currentWord = currentWord + nextChar;
            }
        }while ( (nextChar = iterator.next()) != StringCharacterIterator.DONE);

        return reverse;
    }

    public static String reverse(String forward) {
        if (forward.contains("\"")) {
            return reverseStringPreserveChar(forward, separators);
        }

        if (forward.length() <= 1) {
            return forward;
        }
        return reverse(forward.substring(1)) + forward.charAt(0);
    }
}
