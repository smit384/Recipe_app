import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ViewRecipe = () => {
  const location = useLocation();
  const { recipe } = location.state;
  const [showModal, setShowModal] = useState(false);
  const [newInstructions, setNewInstructions] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const updatedRecipeData = {
        name: recipe.name,
        instructions: newInstructions,
        imageUrl: recipe.imageUrl,
        cookingTime: recipe.cookingTime,
        userOwner: recipe.userOwner,
      };
      const response = await axios.put(
        `https://recipe-app-backend1.onrender.com/recipes/${recipe._id}`,
        updatedRecipeData
      );

      console.log(response.data);
      alert("Updated Recipe");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Error updating recipe");
    }

    setShowModal(false);
  };

  async function deleteRecipe() {
    try {
      await axios.delete(`https://recipe-app-backend1.onrender.com/recipes/${recipe._id}`);
      alert("deleted recipe");
      navigate("/addrecipe");
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    console.log(recipe);
    async function getRecipe() {
      try {
        const resp = await axios.get(
          `https://recipe-app-backend1.onrender.com/recipes/${recipe._id}`
        );
        setNewInstructions(resp.data.instructions);
      } catch (error) {
        console.log("error");
      }
    }
    getRecipe();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gray-900 flex justify-center items-start">
      <div class="max-w-2xl overflow-hidden rounded-lg shadow-md">
        <div className="flex justify-center items-center">
          <img
            class="w-1/2 h-1/2 object-cover "
            src={recipe.imageUrl}
            alt="Article"
          />
        </div>

        <div class="p-6">
          <div>
            <span
              class="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:underline"
              tabindex="0"
              role="link"
            >
              {recipe.name}
            </span>
            <p class="mt-2 text-sm">{newInstructions}</p>
          </div>

          {recipe.userOwner === localStorage.getItem("userID") && (
            <div className="mt-4">
              <button
                onClick={() => setShowModal(true)}
                class="px-6 mr-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Update
              </button>
              <button
                class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                onClick={deleteRecipe}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" bg-gray-600 p-8 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Update Instructions
            </h2>
            <textarea
              className="w-full border p-2 mb-4 text-black h-[300px]"
              value={newInstructions}
              onChange={(e) => setNewInstructions(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-500"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
