import React from "react";
import { LineWithText } from "../../components/LineWithText";
import { foodItems } from "../../components/Food";
import { Food } from "../../interface/Interface";
import { Foods } from "../../components/Foods";

export const BuyFood: React.FC<{
  setListFoods: React.Dispatch<React.SetStateAction<Food[]>>;
}> = ({ setListFoods }) => {
  const [selectedFoods, setSelectedFoods] = React.useState<Food[]>(foodItems);

  React.useEffect(() => {
    setListFoods(selectedFoods);
  }, [selectedFoods]);

  return (
    <div>
      <LineWithText>MUA BẮP NƯỚC</LineWithText>
      <div className="h-auto grid lg:grid-cols-3 sm:grid-cols-2 sm:mx-20 mx-10">
        {selectedFoods.map((food: Food) => (
          <Foods
            key={food.id}
            food={food}
            setSelectedFoods={setSelectedFoods}
          ></Foods>
        ))}
      </div>
    </div>
  );
};
