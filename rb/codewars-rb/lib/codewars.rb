# ----------
# ~ 7 kyu ~
# ----------

# Given a number as a parameter, return an array containing strings
# which form a box.
# Ex:
  # box(5) => [
  #   '-----',
  #   '-   -',
  #   '-   -',
  #   '-   -',
  #   '-----'
  # ]

def box(n)
  arr = []
  n.times do |i|
    midline = ((i == 0 || i == (n - 1)) ? '-' : ' ') * (n - 2)
    arr << ('-' + midline + '-')
  end
  arr
end
