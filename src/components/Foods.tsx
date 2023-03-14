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
      <div className="flex flex-col items-center border-2 rounded-lg m-3">
        <img src={food.image} className="h-40 w-40"></img>
        <div className="w-full bg-white rounded-b-lg">
          <div className="font-bold text-center text-lg">{food.title}</div>
          {food.contents.map((content: string) => (
            <div className="text-center h-10">{content}</div>
          ))}

          <div className="flex items-center justify-between mx-5 my-2">
            <p className="font-bold text-xl">
              {food.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            {food.quantity === 0 ? (
              <div className="h-10">
                <button
                  className="px-4 bg-sky-300 hover:bg-sky-700 hover:text-white rounded font-semibold py-2"
                  onClick={handleIncreaseQuantity}
                >
                  ADD
                </button>
              </div>
            ) : (
              <div className="flex items-center h-10">
                <button
                  className="flex items-center justify-center h-6 w-6 rounded-full bg-sky-300 hover:bg-sky-700 hover:text-white  font-bold"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <div className="h-8 w-8 flex items-center justify-center font-bold text-lg">
                  {food.quantity}
                </div>
                <button
                  className="flex items-center justify-center h-6 w-6 rounded-full bg-sky-300 hover:bg-sky-700 hover:text-white  font-bold"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
