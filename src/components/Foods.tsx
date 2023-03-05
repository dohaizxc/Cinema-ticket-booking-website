import React from "react";
import { Food } from "../interface/Interface";

export const Foods: React.FC<{
  food: Food;
  setSelectedFoods: React.Dispatch<React.SetStateAction<Food[]>>;
}> = ({ food, setSelectedFoods }) => {
  const handleIncreaseQuantity = () => {
    if (food.quantity < 9) {
      setSelectedFoods((prevSetSelectedFoods: Food[]): Food[] => {
        const newFoods: Food[] = JSON.parse(
          JSON.stringify(prevSetSelectedFoods)
        );
        const index = newFoods.findIndex((elem) => elem.id === food.id);
        newFoods[index].quantity += 1;
        return newFoods;
      });
    }
  };

  const handleDecreaseQuantity = () => {
    if (food.quantity > 0) {
      setSelectedFoods((prevSetSelectedFoods: Food[]): Food[] => {
        const newFoods: Food[] = JSON.parse(
          JSON.stringify(prevSetSelectedFoods)
        );
        const index = newFoods.findIndex((elem) => elem.id === food.id);
        newFoods[index].quantity -= 1;
        return newFoods;
      });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 border rounded-lg m-2 p-1">
        <img src={food.image} className="p-4"></img>
        <div className="col-span-2">
          <div className="font-bold">{food.title}</div>
          {food.contents.map((content: string) => (
            <div>{content}</div>
          ))}
          <div>
            <span className="font-bold">Giá: </span>
            {food.price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <div className="flex py-2 items-center">
            <button
              className="flex items-center justify-center h-8 w-8 rounded-full bg-sky-300 hover:bg-sky-700"
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <div className="h-8 w-8 flex items-center justify-center bg-gray-100">
              {food.quantity}
            </div>
            <button
              className="flex items-center justify-center h-8 w-8 rounded-full bg-sky-300 hover:bg-sky-700"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
