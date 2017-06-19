require 'byebug'
# 1A
# Write a method, digital_root(num). It should sum the digits of a positive integer. If it is greater than or equal to 10, sum the digits of the resulting number. Keep repeating until there is only one digit in the result, called the "digital root". Do not use string conversion within your method.

def digital_root(num)
  return num if num / 10 == 0
  return (num % 10) + digital_root(num / 10)
end

p digital_root(1) == 1
p digital_root(12) == 3
p digital_root(123) == 6
p digital_root(123456) == 21

# Write a function that takes a message and an increment amount and outputs the same letters shifted by that amount in the alphabet. Assume lowercase and no punctuation. Preserve spaces.

def caesar_cipher(str, shift)
  alphabet = ("a".."z").to_a
  result = ''

  str.chars.to_a.each do |char|
    if char == ' '
      result.concat(' ')
    else
      new_index = alphabet.to_a.index(char) + shift
      result += alphabet[new_index % alphabet.length]
    end
  end

  result
end

p caesar_cipher('abc', 1) == 'bcd'
p caesar_cipher('abc', 3) == 'def'
p caesar_cipher('abc', 26) == 'abc'
p caesar_cipher('abc', -2) == 'yza'
p caesar_cipher('abc def', 1) == 'bcd efg'

#1b
# Write a function, longest_common_substring(str1, str2) that takes two strings and returns the longest common substring. A substring is defined as any consecutive slice of letters from another string.

def longest_common_substring(str1, str2)
  long_string = str1.length > str2.length ? str1 : str2
  short_string = str1.length > str2.length ? str2 : str1
  longest_substr = ''

  short_string.length.times do |start_idx|
    short_string.length.times do |end_idx|
      if start_idx < end_idx
        substr = short_string.slice(start_idx, end_idx)
        if long_string.match(substr) && substr.length > longest_substr.length
          longest_substr = substr
        end
      end
    end
  end

  longest_substr
end


p longest_common_substring('asdf sdfg dfgh', 'fgdf ') == 'df '
p longest_common_substring('asdf sdfg dfgh', 'fg df ') == 'fg df'

# Write a function that takes an array of integers and returns their sum. Use recursion.

def sum_rec(arr)
  return 0 if arr.empty?
  return arr[0] + sum_rec(arr.drop(1))
end

p sum_rec([1,2,3]) == 6
p sum_rec([1]) == 1
p sum_rec([]) == 0
p sum_rec([-1,2,3]) == 4

# 2a
# Write a function, fibs(num) which returns the first n elements from the fibonnacci sequence, given n. Solve it both iteratively and recursively.

def fibs_iterative(num)
  res = [0,1]
  return res.shift(num) if num < 3

  while res.length < num
    next_num = res[-1] + res[-2]
    res << next_num
  end

  res
end

def fibs_recursive(num, res = [0,1])
  return res.shift(num) if num < 3
  res.push(res[-1] + res[-2])
  return fibs_recursive(num, res) if res.length < num
  return res
end


p fibs_iterative(0) == []
p fibs_iterative(1) == [0]
p fibs_iterative(2) == [0,1]
p fibs_iterative(3) == [0,1,1]
p fibs_iterative(10) == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

p fibs_recursive(0) == []
p fibs_recursive(1) == [0]
p fibs_recursive(2) == [0,1]
p fibs_recursive(3) == [0,1,1]
p fibs_recursive(10) == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Write a function that takes a string and returns true if it's a palindrome, false if it's not. Don't use the native reverse method.

def isPalindrome(str)
  str == reverse(str)
end

def reverse(str)
  reversed_str = ''

  str.chars.to_a.each do |char|
    reversed_str = char + reversed_str
  end

  reversed_str
end

p isPalindrome('isPalindrome') == false
p isPalindrome('isPalindromemordnilaPsi') == true
p isPalindrome('isPalindrome emordnilaPsi') == true
p isPalindrome(' ') == true

# Consider a function `p(x)` that returns `true` if the number of 1 bits in the binary representation of x is a perfect square, and `false` otherwise, eg:
#
#     p(0) # binary is "0", 0 1's, 0 is not a perfect square
#     => false
#
#     p(1) # binary is "1", 1 1, 1 is a perfect square
#     => true
#
#     p(23) # binary is "10111", 4 1's, 4 is a perfect square
#     => true
#
#     p(24) # binary is "11000", 2 1's, 2 is not a perfect square
#     => false
#
# Write a function `perfect_bits(a, b)` (you may assume that a and b are 64-bit unsigned integers and `a <= b`) that returns the number of integers on the range [a, b] for which p(x) would return true.
#
# For example:
#
#     perfect_bits(1645098712823793798, 14889998042940624528)
#     => 1070002673201129717
#
# You may check your solution against [perfect-bits.binti.com](https://perfect-bits.binti.com/?a=1645098712823793798&b=14889998042940624528)

def binary_rep(num)
  num.to_s(2)
end

p binary_rep(0) == '0'
p binary_rep(1) == '1'
p binary_rep(23) == '10111'
p binary_rep(24) == '11000'

def count_ones(binary_num)
  binary_num.count('1')
end

p count_ones('0') == 0
p count_ones('1') == 1
p count_ones('10111') == 4
p count_ones('11000') == 2

def is_perfect_square?(num)
  return false if num < 1
  Math.sqrt(num) % 1 == 0
end

p is_perfect_square?(0) == false
p is_perfect_square?(1) == true
p is_perfect_square?(4) == true
p is_perfect_square?(2) == false

def perfect_bits(a, b)
  (a..b).to_a.count do |current_num|
    binary_rep = binary_rep(current_num)
    ones_count = count_ones(binary_rep)
    is_perfect_square?(ones_count)
  end
end

p perfect_bits(0, 5) == 3
p perfect_bits(1, 10) == 4
p perfect_bits(1, 100) == 33
p perfect_bits(1, 1000) == 225
p perfect_bits(12345, 123456) == 23391
