const arr1 = [
  { id: 5, name: "shaown" },
  { id: 6, name: "shaown" },
  { id: 7, name: "shaown" },
  { id: 10, name: "sdjfld" },
  { id: 17, name: "skdjfl" },
  { id: 17, name: "skdjfl" },
  { id: 200, name: "skdjfl" },
];

let maxObjectId;

for (var i = 0; i < arr1.length; i++) {
  for (var j = i; j < arr1.length; j++) {
    if (arr1[i].id <= arr1[j].id) {
      maxObjectId = arr1[i];
    }
  }
}

localStorage.setItem("id", JSON.stringify(maxObjectId));

let getItem = localStorage.getItem("id");
let intData = JSON.parse(getItem);
let setDataId = intData.id;

if (maxObjectId > getItem) {
  localStorage.setItem("id", maxObjectId);
} else {
  intData = JSON.parse(localStorage.getItem("id"));
}

arr1.push({
  id: setDataId + 1,
  name: "slkjal",
});

console.log(arr1);
