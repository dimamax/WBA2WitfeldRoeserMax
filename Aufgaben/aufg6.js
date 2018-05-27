let array = [4, 1];

sortInteger(array);

function sortInteger(array) {

    if (array[0] > array[1]) {
        this.array = array[0];
        array[0] = array[1];
        array[1] = this.array;
    }

    console.log(array)
}