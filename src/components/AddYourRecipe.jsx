import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddYourRecipe = () => {
  const [dishName, setDishName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const navigate = useNavigate();

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The base64 representation of the image is available here
        setBase64Image(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  async function AddRecipe() {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual key name
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `https://recipe-app-backend1.onrender.com/recipes/addrecipe`,
        {
          name: dishName,
          instructions,
          imageUrl: base64Image,
          cookingTime,
          userOwner: localStorage.getItem("userID"),
        },
        {
          headers,
        }
      );
      alert("Recipe added successfully");
      navigate("/addrecipe");
      console.log("Recipe added successfully:", response.data);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  }

  return (
    <div className="w-screen h-fit">
      <div className="w-screen h-fit bg-gray-900 ">
        <div className="flex flex-col items-center justify-start  px-6 py-8 mx-auto md:min-h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold ">
            Add Recipe
          </div>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="dishname"
                    className="block mb-2 text-sm font-medium "
                  >
                    Dish Name
                  </label>
                  <input
                    type="text"
                    name="dishname"
                    id="dishname"
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dish Name"
                    required={true}
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="instructions"
                    className="block mb-2 text-sm font-medium "
                  >
                    Instructions
                  </label>
                  <textarea
                    type="text"
                    name="instructions"
                    id="instructions"
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Instructions"
                    required={true}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="cookingtime"
                    className="block mb-2 text-sm font-medium "
                  >
                    Cooking Time
                  </label>
                  <input
                    type="text"
                    name="cookingtime"
                    id="cookingtime"
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cooking Time"
                    required={true}
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium "
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Image"
                    required={true}
                    onChange={(e) => handleImageChange(e)}
                  />
                  {base64Image && (
                    <img
                      src={base64Image}
                      alt="Selected"
                      style={{ maxWidth: "300px", maxHeight: "300px" }}
                    />
                  )}
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  onClick={AddRecipe}
                >
                  Add Recipe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddYourRecipe;
