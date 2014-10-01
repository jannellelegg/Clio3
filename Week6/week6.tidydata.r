install.packages("dplyr")
library(dplyr)
library(tidyr)
library(historydata)
library(ggplot2)

data(sarna.csv)
sarna 
# this is the cleaned up sarna
# working off the original raw sarna
sarnaUntidy <- read.csv("historydata/data-raw/sarna.csv", stringsAsFactors = FALSE)
sarnaUntidy

sarnaUntidy <- sarnaUntidy %>%
  tbl_df() %>%
  select(year,
         population_low = estimate_low,
         population_high = estimate_high,
         percentage_low = percentage_pop_low,
         percentage_high = percentage_pop_high) %>%
  gather(estimate, counts, -year)
# THIS WORKED!

#cleaning up some of my own data on 1900 census
rawdata <- read.csv("historydata/1900Census.csv", stringsAsFactors = FALSE)
rawdata
  
censusTidy <- rawdata %>%
  tbl_df() %>%
  select(year = Census.year,
         respondants.total = Total.Population,
         respondants.deaf = number.deaf,
         - ratio.of.population) %>%
  gather(respondant, results, -year)
censusTidy

# let's play with the data a bit - what if I need a specific year? or sample size?
oneYear <- censusTidy %>%
  filter (year == 1900)
oneYear

sample10000 <- censusTidy %>%
  filter (results >=10000)
sample10000
        
# if I wanted to organize them by population size
popSize <- censusTidy %>%
  arrange(results)
popSize

# if I want to get the number of the total pop in a given year, minus 
# the deaf population ( the hearing population)- I can compare with rawdata 
# and use mutate to compare the columns and create a new one

censusCompare <- rawdata %>%
  select(year = Census.year,
         totalpop = Total.Population,
         deafpop = number.deaf,
         -ratio.of.population)
censusCompare

hearingPop <- censusCompare %>%
  mutate(hearingpop = totalpop - deafpop)
hearingPop
  
# or I can use censusTidy and use spread() to extract the different pops
# from the Respondants column and compare it using mutate

hearingPop2 <- censusTidy %>%
  spread(respondant, results) %>%
  select(year,
         totalpop = respondants.total,
         deafpop = respondants.deaf) %>%
  mutate(hearingpop2 = totalpop - deafpop)
hearingPop2

# Ignore the failures below!
#Got it to work, but now ratio is in the same column as respondants and
# causing problems. Moving it around.

#censusTidy <- censusTidy %>%
 # tbl_df() %>%
  #select(Census.year,
   #      respondants.total = Total.Population,
    #     respondants.deaf = number.deaf,
     #    ratio = ratio.of.population) %>%
#  gather(respondant, results, ratio, -Census.year)
#censusTidy

#Nope, now respondants are split in columns
# I'd rather just remove the ratio column altogether
# Just removing the ratio options doesn't work

#censusTidy <- censusTidy %>%
 # tbl_df() %>%
  #select(Census.year,
   #      respondants.total = Total.Population,
    #     respondants.deaf = number.deaf,
     #   - ratio.of.population) %>%
 # gather(respondant, results, -Census.year)
#censusTidy


#trying something else now:

#summarize national population for each year. THIS WORKED!!

states <- read.csv("historydata/data-raw/nhgis0011_ts_state.csv", stringsAsFactors = FALSE)
states

states <- states %>%
  select(GISJOIN,
         year = YEAR,
         state = STATE,
         statea = STATEA,
         name = NAME,
         statepop = A00AA) %>%
  group_by(year) %>%
  summarize(nationalpop = sum(statepop))
states

#failures
# attempts to rename, reorder content
#states <- states %>%
 # select(GISJOIN,
  #       year = YEAR,
   #      state = STATE,
    #     statea = STATEA,
     #    name = NAME,
      #   statepop = A00AA) %>%
#  gather(GISJOIN, year, state, statea, name, statepop)

# group it together by year
#states <- states %>%
 # filter(YEAR == 1790)

#THIS WORKED TO SELECT ONLY PARTS OF CHART, RENAME POP - could also have put
# select(-GISJOIN, -statea, -name)
#states <- states %>%
 # select(YEAR, NAME, STATEPOP = A00AA)

# other "verbs" to work with: arrange() , mutate(), spread ()


  






