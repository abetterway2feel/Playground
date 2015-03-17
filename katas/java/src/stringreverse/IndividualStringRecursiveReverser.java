package stringreverse;

import java.text.StringCharacterIterator;

public class IndividualStringRecursiveReverser {

    private static String reverseStringPreserveChar(String forward, String separatorChars) {
        String reverse = "";
        String currentWord = "";
        StringCharacterIterator iterator = new StringCharacterIterator(forward);
        char nextChar = iterator.current();
        while ( nextChar != StringCharacterIterator.DONE){
            if (separatorChars.contains(nextChar+"") ) {
                if (currentWord.length() > 0) {
                    reverse = reverse + reverse(currentWord);
                    currentWord = "";
                }
                reverse = reverse + nextChar;
            } else {
                currentWord = currentWord + nextChar;
            }
            nextChar = iterator.next();
        }
        return reverse + reverse(currentWord);
    }

    public static String reverse(String forward) {
        if (forward.contains("\"") || forward.contains(" ")) {
            return reverseStringPreserveChar(forward, " \"");
        }

        if (forward.length() <= 1) {
            return forward;
        }
        return reverse(forward.substring(1)) + forward.charAt(0);
    }
}
