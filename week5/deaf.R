getwd()
setwd("/Users/JannelleLegg/Clio3/week5")
list.files()
install.packages("ggplot2")
library(ggplot2)


deaf <- read.csv("Number of deaf and dumb and the ratio per million of total population 1830-1900.csv")
dim(deaf)
head(deaf)
length(deaf)
deaf

ggplot(data=deaf,aes(x=Census.year,y=Total.Population)) + geom_bar(stat="identity")
#broken - doesn't show a comparison

ggplot(data=deaf,aes(x=Census.year,y=number.deaf)) + geom_bar(stat="identity")
# broken - pulling number of deaf in order of column, not static)



#summary(ma.data) lets you look at information about the data - helpful
