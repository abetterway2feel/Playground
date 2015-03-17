package bowling.frame;

public class FinalFrame extends Frame {
    private int thirdRoll = -1;

    @Override
    public void roll(int pins) {
        if (firstRoll == -1) {
            started = true;
            firstRoll = pins;
        } else if (!(isSecondRollTaken())) {
            secondRoll = pins;
        } else if (!(isThirdRollTaken())) {
            thirdRoll = pins;
        }
    }

    @Override
    public boolean isComplete() {
        return firstRollTaken()
                && isSecondRollTaken()
                && ((firstRoll + secondRoll) < STRIKE || thirdRoll > -1);
    }

    @Override
    public void addBonusesToPrevious(int pins) {
        if(!(isSecondRollTaken())){
            super.addBonusesToPrevious(pins);
        }
        else if(firstTwoRollsMadeASpare()){
           this.addSpareBonus(pins);
        }
        else{
            if(!(isThirdRollTaken())){
                if(isFirstRollAStrike()){
                    this.addStrikeBonus(pins);
                    if(getPrevious().isStrike()) {
                        getPrevious().addStrikeBonus(pins);
                    }
                }
            }
        }
    }

    private boolean isFirstRollAStrike() {
        return firstRoll == STRIKE;
    }

    private boolean firstRollTaken() {
        return firstRoll > -1;
    }

    private boolean isSecondRollTaken() {
        return secondRoll > -1;
    }

    private boolean isThirdRollTaken() {
        return thirdRoll > -1;
    }

    private boolean firstTwoRollsMadeASpare() {
        return (firstRoll + secondRoll) == 10;
    }

    @Override
    public void setNext(Frame next) {}
}
