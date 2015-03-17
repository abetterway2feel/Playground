package bowling;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class AGame {

    Game game = new Game();

    @Test
    public void givenAGutterBallGAme_thenGameScoreIs9(){
        rollMany(20, 0);

        assertThat(game.score(), is(0));
    }

    @Test
    public void given20RollsOf1_thenGameScoreIs20(){
        rollMany(20, 1);

        assertThat(game.score(), is(20));
    }

    @Test
    public void givenOneSpareAndTheRestOnes_thenGameScoreIs(){
        //frame 1
        rollSpare();
        //frame 2
        rollMany(18, 1);

        assertThat(game.score(), is(29));
    }

    @Test
     public void givenAStrikeAFrameOf9andAFrameOf5_thenGameScoreIs33(){
        //frame 1
        rollStrike();
        //frame 2
        game.roll(5);
        game.roll(4);
        //frame 3
        game.roll(5);
        game.roll(0);

        assertThat(game.score(), is(33));
    }


    @Test
    public void givenAPerfectGame_thenGameScoreIs300(){
        rollMany(12, 10);

        assertThat(game.score(), is(300));
    }

    @Test
    public void givenAPerfectGameUpUntilThe9thFrameAnTwoGutterBallsInTheTenth_thenGameScoreIs240(){
        rollMany(9, 10);
        rollMany(2, 0);

        assertThat(game.score(), is(240));
    }

    @Test
    public void givenAPerfectGameUpUntilThe9thFrameASpareInTheTenth_thenGameScoreIs265(){
        rollMany(9, 10);
        rollSpare();
        game.roll(0);

        assertThat(game.score(), is(265));
    }

    @Test
    public void givenAHalfPerfectGameUp_thenGameScoreIs150(){
        rollMany(21, 5);

        assertThat(game.score(), is(150));
    }

    private void rollSpare() {
        game.roll(5);
        game.roll(5);
    }

    private void rollStrike() {
        game.roll(10);
    }

    private void rollMany(int rolls, int score) {
        for(int i = 1; i <= rolls; i++){
            game.roll(score);
        }
    }
}
