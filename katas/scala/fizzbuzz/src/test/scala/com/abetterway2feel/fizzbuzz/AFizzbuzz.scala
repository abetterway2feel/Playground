package com.abetterway2feel.fizzbuzz

import org.scalatest._
import org.scalatest.prop._

class AFizzbuzz extends PropSpec with TableDrivenPropertyChecks with Matchers {
  lazy val divisibleByThree = Table("number", 3, 6, 9, 12, 102)
  lazy val divisibleByFive = Table("number", 5, 10, 20, 25, 500)
  lazy val divisibleByThreeAndFive = Table("number", 15, 30, 45, 60, 150)
  lazy val other = Table("number", 1, 2, 4, 31, 28, 103)
  val fb = new Fizzbuzz

  property("should return `fizz' when given a number that is divisible by three") {
    forAll(divisibleByThree) { number =>
      fb.evaluate(number) should be("fizz")
    }
  }

  property("should return `buzz' when given a number that is divisible by five") {
    forAll(divisibleByFive) { number =>
      fb.evaluate(number) should be("buzz")
    }
  }

  property("should return `fizzbuzz' when given a number that is divisible by thee and five") {
    forAll(divisibleByThreeAndFive) { number =>
      fb.evaluate(number) should be("fizzbuzz")
    }
  }

  property("should return the number when given a number that is not divisible by thee or five") {
    forAll(other) { number =>
      fb.evaluate(number) should be(number)
    }
  }

}
