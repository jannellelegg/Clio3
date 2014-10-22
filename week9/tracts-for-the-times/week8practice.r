setwd("~/Clio3/week9/tracts-for-the-times/")
tract01 <- scan("tract01.txt", what = "character", sep = "\n")
tract01


tracts <- c(tract01, tract02, tract03)
# not effective

filenames <- c("tract01.txt", "tract02.txt", "tract03.txt")
tracts <- lapply(filenames, scan, what = "character", sep = "\n")
str(tracts)

# list = like an array, more like an object in Javascript. so it pulled
# tracts into one list, but keeps them separate

my_nested_list <- list(first = "Orestes",
                       last  = "Brownson",
                       occupation = list(title = "editor",
                                         firm  = "Brownson's Quarterly Review"),
                       
                       religion = list(denomination = "Roman Catholic",
                                       converted = as.Date("1844-10-20")
                       ))

my_nested_list$first
my_nested_list$religion$denomination
my_nested_list[1]
my_nested_list[[1]]
#this will produce the contents WITHIN the list, so rather than spitting out
# the first instance and "orestes", it will just give us "orestes"

#list is recursive structure - lists can contain other lists


class(tracts[1])
#returns list

class(tracts[[1]])
#returns character

tracts[[1]][1]
names(tracts)
#fails because we don't automatically have names, but we did save that in the 
# function  filenames

filenames
names(tracts) <- filenames

# to get all the file names use a wild card

filenames <- Sys.glob("tract*.txt")
tracts <- lapply(filenames, scan, what = "character", sep = "\n")
#read all files
# lapply is a function that works on lists - 
# filenames is the list to grab from
#scan, is the function we are calling, 
# what and sep = features of that

add_one <- function(x) {x + 1}
lapply(1:5, add_one)

lapply(filenames, read.csv, stringsAsFactors = FALSE)


length(tracts)
lapply(tracts, length)

tract_length <- lapply(tracts, length)
unlist(tract_length)

lapply(tracts[1:3], tolower)

library(magrittr)
Sys.glob(*.txt) %>%
  lapply(scan, what = "character") %>%
  lapply(tolower) %>%
  lapply(tokenize) %>%
  rbind_all()
#rbind pulls them all together - not recommend because BIG files


as.character
as.numeric




