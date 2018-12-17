# -------------------data/-----------------------
    a. tenNumbers.txt
    b. words
            => One file have extension and another doesn't have

# -------------------src/library.js----------------
    => poor file name
    => arguments order in line 11 and 20
    => poor key name in line 15 and 24 
    => No need of line number 53
    => Duplication of 2 extractFileContent function
    => Utility function that are not in utility

# --------------------src/util.js-------------------
    => poor file name

# ---------------src/handleException.js----------
    =>duplication in line number 12 and 29
    =>Long function name in line number 52

# --------------src/handleInput.js-------------
    => extract line number 8 into a function

# --------------tail.js && head.js--------------
    => arguments order in line 5
    => there is logic on line 5

# -------------test/utilTest.js-------------------
    => More than 1 type of test cases in one it block

# -------------test/handleInput.js-------------------
    => More than 1 type of test cases in one it block
    => Long assert statements

# -------------test/handleException.js-------------------
    => More than 1 type of test cases in one it block
    => Long assert statements
    => Not using assert object

# --------------test/libraryTest.js-----------------
    => poor file name
    => More than 1 type of test cases in one it block
    => duplication in test cases 126 # > 143
    => poor variables for 158 # > 167
    => remove "test for" function description msg
