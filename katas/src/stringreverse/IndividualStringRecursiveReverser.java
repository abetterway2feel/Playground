package stringreverse;

public class IndividualStringRecursiveReverser{

    private static String reverseStringPreserveChar(String forward, char separator) {
        String reverse = "";
        String currentWord = "";
        for(char ch:forward.toCharArray()){
            if(ch == separator){
                if(currentWord.length() > 0){
                    reverse = reverse + reverse(currentWord);
                    currentWord = "";
                }
                reverse = reverse + ch;
            }
            else {
                currentWord = currentWord + ch;
            }
        }
        if(currentWord.length() > 0){
            reverse = reverse + reverse(currentWord);
        }
        return reverse;
    }

    public static String reverse(String forward) {
        if (forward.contains("\"")){
            return reverseStringPreserveChar(forward, '"');
        }

        if (forward.contains(" ")){
            return reverseStringPreserveChar(forward, ' ');
        }

        if(forward.length() <= 1){
            return forward;
        }
        return reverse(forward.substring(1)) + forward.charAt(0);
    }
}
