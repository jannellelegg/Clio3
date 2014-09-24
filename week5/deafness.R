getwd()
setwd("/Users/JannelleLegg/Clio3/week5")
list.files()
install.packages("ggplot2")
library(ggplot2)

deafness <- read.csv("CensusPopulation.csv")
deafness

##df <- data.frame(time = factor(c("total","deaf"), levels=c("total","deaf")),Populations = c(0,80000000))

##ggplot(data=deafness, aes(x=Census.year)) + geom_bar(stat="bin")
##ggplot(data=deafness, aes(x=Census.year)) + geom_bar()

ggplot(data=deafness, aes(x=Census.year, y=Populations, fill=Populations)) + geom_bar(stat="identity")
# adding colors

ggplot(data=deafness, aes(x=Census.year, y=Value)) + geom_bar(stat="identity")

df1 <- data.frame (Census.year = factor(c()))
