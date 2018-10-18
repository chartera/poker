#include <stdio.h>
#include <stdbool.h> /* c99 only */
#include <stdlib.h>
#include <time.h>


#define NUM_SUITS 4
#define NUM_RANKS 13
#define HAND_CARDS 5

int getRandom(int);
void printHand();

int getRandom(scale){

  return rand() % scale; 
}

void printHand(){
  int suit, rank, iterator = HAND_CARDS;
  
  bool in_hand[NUM_SUITS][NUM_RANKS] = {false};
  const char rank_code[] = {'2', '3', '4', '5', '6', '8', '9',
		       't', 'j', 'q', 'k','a'};
  const char suit_code[] = {'c', 'd', 'h', 's'};


  printf("Your hand:");
  
  while(iterator > 0) {
    suit = getRandom(NUM_SUITS);
    rank = getRandom(NUM_RANKS);
    if(!in_hand[suit][rank]){
      in_hand[suit][rank] = true;
      iterator--;
      printf(" %c%c", suit_code[suit], rank_code[rank]);
    }
  }
  printf("\n");
}


