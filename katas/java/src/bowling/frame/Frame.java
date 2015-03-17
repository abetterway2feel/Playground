package bowling.frame;

public class Frame {
    public static final int STRIKE = 10;

    boolean started = false;
    int firstRoll = -1;
    int secondRoll = -1;

    private Frame next = null;
    private Frame previous = null;
    private int strikeBonus = 0;
    private int spareBonus = 0;

    public void roll(int pins) {
       if(firstRoll == -1){
           started = true;
           firstRoll = pins;
           if(firstRoll == STRIKE) {
               secondRoll = 0;
           }
       }
       else if(secondRoll == -1){
           secondRoll = pins;
       }
    }

    public int getScore() {
        if(!started){
            return 0;
        }
        else if(isComplete()) {
            return firstRoll + secondRoll + strikeBonus + spareBonus;
        }
        else {
            return firstRoll;
        }
    }

    public boolean isComplete() {
        return isStrike() || firstRoll > -1 && secondRoll > -1;
    }

    public boolean isStrike() {

        return firstRoll == STRIKE;
    }

    public void setNext(Frame next) {
        this.next = next;
    }

    public Frame getNext() {
        return next==null ?  new NullFrame() :  next;
    }

    public boolean hasNext() {
        return next != null;
    }

    public void setPrevious(Frame previous) {
        this.previous = previous;
    }

    public Frame getPrevious() {
        return previous==null ?  new NullFrame() :  previous;
    }

    public boolean isSpare() {
        return !isStrike() && (getScore() == STRIKE);
    }

    public void addSpareBonus(int pins) {
        if(spareBonus == 0){
            spareBonus = pins;
        }
    }

    public void addStrikeBonus(int pins) {
        this.strikeBonus += pins;
    }

    public  void addBonusesToPrevious(int pins) {
        Frame previous = this.getPrevious();
        Frame TwoFramesAgo = previous.getPrevious();

        if (previous.isSpare()) {
            previous.addSpareBonus(pins);
        }
        else if (previous.isStrike()) {
            previous.addStrikeBonus(pins);
            if (TwoFramesAgo.isStrike()) {
                TwoFramesAgo.addStrikeBonus(pins);
            }
        }
    }

    @Override
    public String toString() {
        return "Frame{" +
                getScore() +
                '}';
    }
}
