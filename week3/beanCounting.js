function countBs(words) {
  var counter = 0
  var letters = 0
  while (counter <= words.length) {
    if (words.charAt(counter) == "B") {
    	letters++;
      counter++;}
    else if (words.charAt(counter) != "B") {
      counter++;}}
    return letters;}

