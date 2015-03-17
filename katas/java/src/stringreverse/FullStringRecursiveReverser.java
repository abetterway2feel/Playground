package stringreverse;

public class FullStringRecursiveReverser implements Reverser {
    public static String reverse(String forward){
        if(forward.length() == 1){
            return forward;
        }
        return reverse(forward.substring(1)) + forward.charAt(0);
    }

    public static void main(String[] args) {
        System.out.println(reverse(string));
    }

}
