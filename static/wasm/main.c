#include <stdio.h>
#include <emscripten.h>
 
#define LENGTH_OF(array) ((int) (sizeof(array) / sizeof(array[0])))

void print_range(int*, int);

int main(int argc, char *argv[argc])
{ 
  int i,  numbers [] = {1,2,3,4,5,6,7};
  print_range(numbers, LENGTH_OF(numbers));
  return 0;
} 

EMSCRIPTEN_KEEPALIVE
void dummy(){
  printf("Dummy \n");
}

void print_range(int* numbers, int size) {
  int i;
  printf("From C with webassembly ");
  for(i = 0; i < size; i++) {
    printf("%d ", numbers[i]);
  }
  printf("\n");
}

