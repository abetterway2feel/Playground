package com.abetterway2feel.fizzbuzz


class Fizzbuzz {
  def evaluate(number:Int) = {

    var answer = ""
    if(number % 3 == 0) answer +=  "fizz"
    if(number % 5 == 0) answer += "buzz"

    if(answer.isEmpty) number
    else answer
  }

}
