# data-structures
Little class method that returns filtered names array based on two conditions

## Prerequisites
 1. node version 10.5 or higher

## Installation
 1. npm install

## Running
 1. npm run filter-function. you should see an array already sorted and filtered .
 
## Testing
 1. npm run unit:test

# Notes
 I asked if an API was needed to return this data and the answer was no. 
 So i decided to implement a simple class that can be easily reused as a controller
 if an API is created. as a data structure i choose the file `structure.js`, again to keep it simple.
 But it can easily be turned in a Model connected to a database and it'll work as expected thou.
 
# question > How would you optimize the code so that the function will perform better? 
If i have to keep it as a function i'd try to avoid adding any library like _lodash to prevent the overhead and use vanilla javascript,
taking advantage of es6 methods. Also if the data structure can be flattened i'd use a hash table for filter to prevent the nested forEach loops and 
run it once in a linear manner.
If this is connected to a database i'd use indexes for the tables and move all the sorting and filter logic to an SQL script that will 
perform faster. Apart from that i'd use cache to prevent unnecessary runs of the same script, storing results in memory based on the conditions.

  