rescaler <- function(x){
  x - min(x) / diff(range(x))
}