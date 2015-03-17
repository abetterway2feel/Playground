package bowling;

import bowling.frame.Frame;
import bowling.frame.FinalFrame;

public class Game {
    Frame firstFrame;
    Frame currentFrame;
    int numberOfFrames;

    public Game() {
        firstFrame = new Frame();
        numberOfFrames = 1;
        currentFrame = firstFrame;
    }

    public void roll(int pins) {
        currentFrame.roll(pins);
        currentFrame.addBonusesToPrevious(pins);
        incrementFrame();
    }

    private void incrementFrame() {
        if (currentFrame.isComplete()) {
            Frame next;
            switch (numberOfFrames) {
                case 9:
                    next = new FinalFrame();
                    break;
                default:
                    next = new Frame();
            }

            next.setPrevious(currentFrame);
            currentFrame.setNext(next);
            currentFrame = next;
            numberOfFrames++;
        }
    }

    public int score() {
        Frame frame = firstFrame;
        int score = frame.getScore();
        while (frame.hasNext()) {
            frame = frame.getNext();
            score = score + frame.getScore();
        }
        return score;
    }

    public void print() {
        Frame frame = firstFrame;
        int frameNo = 1;
        System.out.println(frameNo+":"+frame.getScore());
        while (frame.hasNext()){
            frame = frame.getNext();
            frameNo++;
            System.out.println(frameNo+":"+frame.getScore());
        }
    }
}
