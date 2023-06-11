import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLoaderStore } from "../../../../store/loaderStore/useLoaderStore";
import { useCategoryStore } from "../../../../store/useCategoryStore/useCategoryStore";
import { userProfileStore } from "../../../../store/profileStore/useProfileStore";
import TextInput from "../../../../shared/inputs/text";

interface PopUpProps {
  id: number | null;
}

interface CategoryProps {
  id: number | any;
  name: string;
  description: string;
  url: string;
}

const CategoryPop = ({ id = null }: PopUpProps) => {
  const { showLoading, hideLoading } = useLoaderStore();
  const { categoryList, loadCategory } = useCategoryStore();
  const { profile } = userProfileStore();
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>({
    id: 0,
    name: "",
    description: "",
    url: "",
  });

  const [editForm, setEditForm] = useState<boolean>(true);

  useEffect(() => {
    GetCategorybyID();
    return () => {};
  }, [id]);

  const GetCategorybyID = async () => {
    if (!id) return;
    if (id === null) return;
    await showLoading();
    await axios({
      method: "get",
      url: `/api/v1/categories/${id}`,
      headers: {},
      data: {},
    })
      .then(({ data }: any) => {        
        setEditForm(false);
        setSelectedCategory(data.data);
        hideLoading();
      })
      .catch((ex: any) => {
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };

  const CreateNewCategory = async () => {
    await showLoading();
    await axios({
      method: "post",
      url: "/api/v2/categories/new",
      headers: {
        token: profile.token
      },
      data: {
        name: categoryName,
        description: categoryDescription,
      },
    })
      .then((res: any) => {
        toast.success(res.headers.msg ? res.headers.msg : "");
        hideLoading();
        loadCategory([
          ...categoryList,
          {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            url: "",
          },
        ]);
        // addNewCategory({id: 5,name: categoryName, description: categoryDescription, url: ""})
      })
      .catch((ex: any) => {
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };

  const handleAllowModify = () => {
    setEditForm(true);
    setCategoryName(selectedCategory.name);
    setCategoryDescription(selectedCategory.description);
  };

  const ModifyCategory = async () => {
    await showLoading();
    await axios({
      method: "patch",
      url: `/api/v2/categories/modify/${id}`,
      headers: {
        token: profile.token
      },
      data: {
        name: categoryName,
        description: categoryDescription,
      },
    })
      .then((res: any) => {
        toast.success(res.headers.msg ? res.headers.msg : "");
        hideLoading();
        let filteredCategoryList = categoryList.filter(
          (el: CategoryProps) => el.id !== id
        );
        loadCategory([
          ...filteredCategoryList,
          {
            id: selectedCategory.id,
            name: categoryName,
            description: categoryDescription,
            url: "",
          },
        ]);
      })
      .catch((ex: any) => {
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };
  return (
    <div className="flex-column" style={{ minWidth: "20rem" }}>
      <div className="pop-up-header"> Category Settings </div>
      <div style={{ margin: "0", padding: "0" }}>
        <div className="pop-up-label"> Category Name</div>
        {editForm ? (
          <TextInput
            displayText={categoryName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCategoryName(e.currentTarget.value);
            }}
            placeHolder="Type new category name(required)"
            additionalClass=""
          />
        ) : (
          <label className="pop-up-label" onClick={handleAllowModify}>     
            {selectedCategory.name}
          </label>
        )}
      </div>
      <div style={{ margin: "0", padding: "0" }}>
        <div className="pop-up-label"> Category Description</div>
        {editForm ? (
          <TextInput
            displayText={categoryDescription}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCategoryDescription(e.currentTarget.value);
            }}
            placeHolder="Type a description for category(optional)"
            additionalClass=""
          />
        ) : (
          <label className="pop-up-label" onClick={handleAllowModify}>        
            {selectedCategory.description}
          </label>
        )}
      </div>

      <button
        className="auth-btn"
        onClick={!id ? CreateNewCategory : ModifyCategory}
      >
        {!id ? "New Category" : "Update Category"}
      </button>
      <ToastContainer />
    </div>
  );
};

export default CategoryPop;
