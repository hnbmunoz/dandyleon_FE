import React, { useState, useEffect, MouseEvent } from "react";
import { useLoaderStore } from "../../../../store/loaderStore/useLoaderStore";
import { useFilterStore } from "../../../../store/filterStore/useFilterStore";
import { useBlurStore } from "../../../../store/blurStore/useBlurStore";
import { usePopUpStore } from "../../../../store/popupStore/usePopUpStore";
import { usePopUpInterface } from "../../../../store/popupStore/usePopUpInterface";
import { useCategoryStore } from "../../../../store/useCategoryStore/useCategoryStore";
import CategoryPop from "../Pop/CategoryPop";

interface CategoryProps {
  id: number | null;
  name: string;
  description: string;
  url: string;
}

const AnotherTestInterface = () => {
  return <>this is another test interface</>;
};

const CategoryPanel = () => {
  const { showLoading, hideLoading } = useLoaderStore();
  const { showPopUp } = usePopUpStore();
  const { overwriteInterface } = usePopUpInterface();
  const { showBlur } = useBlurStore();
  const { setFilter } = useFilterStore();
  const { categoryList } = useCategoryStore();

  const [categories, setCategories] = useState<CategoryProps[]>([
    { id: 0, name: "", description: "", url: "" },
  ]);
  

  useEffect(() => {
    DisplayCategories();
    return () => {};
  }, [categoryList]);


  const DisplayCategories = async() => {
    await showLoading();
    await setCategories([...categories,...categoryList])
    await hideLoading();
  }

  const openCategoryPopUp = async (e : MouseEvent<HTMLButtonElement>) => {    
    await overwriteInterface(<CategoryPop id={Number(e.currentTarget.dataset.category_id)} />);
    await showBlur();
    await showPopUp();
  }

  return (
    <div className="config-panel">
      <div className="config-header"> List of Categories </div>
      <div className="config-body">
        <div className="config-table">
          <div className="table-header">
            <div className="header-elements col-width1">Name</div>
            <div className="header-elements col-width2">Description</div>
            <div className="header-elements col-width3">Options</div>
          </div>
          <div className="table-body">
            {categoryList
              .filter((allRecord) =>
                allRecord.name
                  .toLowerCase()
                  .includes(`${setFilter.toLowerCase().trim()}`)
              )
              .map((el) => {
                return (
                  <div className="table-row" >
                    <div className="table-elements col-width1">{el.name}</div>
                    <div className="table-elements col-width2">
                      {el.description}
                    </div>
                    <div className="table-elements col-width3" >                     
                      <button className="table-btn-details" data-category_id={el.id} onClick={openCategoryPopUp}>
                         Details
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="table-footer" data-category_name="">
              <button className="new-btn" onClick={openCategoryPopUp}>
                Add new Record
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPanel;
