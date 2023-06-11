import React, { useState, useEffect, ChangeEvent} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLoaderStore } from "../../../../store/loaderStore/useLoaderStore";
import { useProductStore } from "../../../../store/useProductStore/useProductStore";
import { useCategoryStore } from "../../../../store/useCategoryStore/useCategoryStore";
import { userProfileStore } from "../../../../store/profileStore/useProfileStore";
import TextInput from "../../../../shared/inputs/text";
import DropDown from "../../../../shared/inputs/dropdown";
import NumberInput from "../../../../shared/inputs/number";
// import HTMLIn
interface PopUpProps {
  id: number | null;
}

interface DropdownProps {
  id: number | any;
  name: string;
}

interface ProductProps {
  id: number | any;
  name: string;
  category_id: number | any;
  category_name: string;
  description: string;
  price: number;
  discount: number;
  image_url: string;
}

const ProductPop = ({ id = null }: PopUpProps) => {
  const { showLoading, hideLoading } = useLoaderStore();
  const { productList, loadProduct } = useProductStore();
  const { categoryList, loadCategory } = useCategoryStore();
  const { profile } = userProfileStore();
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productImage, setProductImage] = useState<any>(null);

  const [selectedProduct, setSelectedProduct] = useState<ProductProps>({
    id: 0,
    name: "",
    category_id: 0,
    category_name: "",
    description: "",
    price: 0,
    discount: 0,
    image_url: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<DropdownProps>({
    id: 0,
    name: "",
  });
  const [productPrice, setProductPrice] = useState<string>("0");
  const [productDiscount, setProductDiscount] = useState<string>("0");
  const [editForm, setEditForm] = useState<boolean>(true);
  let dollarUSLocale = Intl.NumberFormat("en-US");

  useEffect(() => {
    GetProductbyID();
    return () => {};
  }, [id]);

  const GetProductbyID = async () => {
    if (!id) return;
    if (id === null) return;
    await showLoading();
    await axios({
      method: "get",
      url: `/api/v2/products/${id}`,
      headers: {
        token: profile.token,
      },
      data: {},
    })
      .then(({ data }: any) => {        
        setEditForm(false);
        setSelectedProduct(data);
        hideLoading();
      })
      .catch((ex: any) => {
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };

  const CreateProduct = async () => {    
    await showLoading();
    await axios({
      method: "post",
      url: "/api/v2/products/new",
      headers: {
        token: profile.token,
        "Content-Type": "multipart/form-data",
        // application/*
      },
      data: {
        name: productName,
        description: productDescription,
        category_id: selectedCategory.id,
        price: parseFloat(productPrice.replace(/[^\d\.]/g, "")),
        discount: parseFloat(productDiscount.replace(/[^\d\.]/g, "")) / 100,
        url: "",    
        image: productImage
      },
    })
      .then((res: any) => {
        toast.success(res.headers.msg ? res.headers.msg : "");
        hideLoading();
        loadProduct([
          ...productList,
          {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            category_id: res.data.category_id,
            price: res.data.price,
            discount: res.data.discount,
            image_url: res.data.image_url
          },
        ]);
      })
      .catch((ex: any) => {
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };

  const handleAllowModify = () => {
    setEditForm(true);
    setProductName(selectedProduct.name);
    setProductDescription(selectedProduct.description);
  };

  const handleDropSelect = (categoryID: number, categoryName: string) => {
    setSelectedCategory({ id: categoryID, name: categoryName });
  };

  const ModifyProduct = async () => {
    await showLoading();
    await axios({
      method: "patch",
      url: `/api/v2/products/modify/${id}`,
      headers: { token: profile.token,},
      data: {
        name: productName,
        description: productDescription,
        category_id: selectedCategory.id === 0 ? selectedProduct.category_id : selectedCategory.id,
        price: parseFloat(productPrice.replace(/[^\d\.]/g, "")),
        discount: parseFloat(productDiscount.replace(/[^\d\.]/g, "")) / 100,
      },
    })
      .then((res: any) => {
        toast.success(res.headers.msg ? res.headers.msg : "");
        hideLoading();
        let filteredProductList = productList.filter(
          (el: DropdownProps) => el.id !== id
        );
        loadProduct([
          ...filteredProductList,
          {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            category_id: res.data.category_id,
            price: res.data.price,
            discount: res.data.discount,
            image_url: "",
          },
        ]);
        setSelectedCategory({
          id: selectedCategory.id === 0 ? selectedProduct.category_id : selectedCategory.id,
          name: selectedCategory.name === "" ? selectedProduct.category_name : selectedCategory.name
        })
      })
      .catch((ex: any) => {
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };
  return (
    <div className="flex-column" style={{ minWidth: "20rem" }}>
      <div className="pop-up-header"> Product Settings</div>
      <div className="flex-row">
        <div style={{ margin: "0 1rem", padding: "0" }}>
          {/**basic Info */}
          <div style={{ margin: "0", padding: "0" }}>
            <div className="pop-up-label"> Product Name</div>
            {editForm ? (
              <TextInput
                displayText={productName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setProductName(e.currentTarget.value);
                }}
                placeHolder="Type new product name(required)"
                additionalClass=""
              />
            ) : (
              <label className="pop-up-label" onClick={handleAllowModify}>
                {selectedProduct.name}
              </label>
            )}
          </div>
          <div style={{ margin: "0", padding: "0" }}>
            <div className="pop-up-label"> Product Description</div>
            {editForm ? (
              <TextInput
                displayText={productDescription}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setProductDescription(e.currentTarget.value);
                }}
                placeHolder="Type a description for product(optional)"
                additionalClass=""
              />
            ) : (
              <label className="pop-up-label" onClick={handleAllowModify}>
                {selectedProduct.description}
              </label>
            )}
          </div>
        </div>

        <div style={{ margin: "0 1rem", padding: "0" }}>          
          <div style={{ margin: "0", padding: "0" }}>
            <div className="pop-up-label"> Select Category</div>
            {editForm ? (
              <DropDown
                dataStore={categoryList.map((item) => ({
                  id: item.id,
                  value: item.name,
                }))}
                onDropSelect={handleDropSelect}
                placeholder="Select Category"
              />
            ) : (
              <label className="pop-up-label" onClick={handleAllowModify}>
                {selectedProduct.category_name}
              </label>
            )}
          </div>
          <div style={{ margin: "0", padding: "0" }}>
            <div className="pop-up-label"> Select Price</div>
            {editForm ? (
              <NumberInput
                displayValue={productPrice.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.trim() === "") {
                    setProductPrice("0");
                    return;
                  }
                  setProductPrice(
                    e.currentTarget.value.replace(/[^\d\.]/g, "")
                  );
                }}
                onBlur={() => {
                  setProductPrice(
                    dollarUSLocale.format(
                      Number(productPrice.replace(/[^\d\.]/g, ""))
                    )
                  );
                }}
                incrementState={() => {
                  setProductPrice(
                    dollarUSLocale.format(
                      Number(productPrice.replace(/[^\d\.]/g, "")) + 1
                    )
                  );
                }}
                decrementState={() => {
                  setProductPrice(
                    dollarUSLocale.format(
                      Number(productPrice.replace(/[^\d\.]/g, "")) - 1
                    )
                  );
                }}
                placeHolder="Type product price(optional)"
              />
            ) : (
              <label className="pop-up-label" onClick={handleAllowModify}>
                {dollarUSLocale.format(selectedProduct.price)}
              </label>
            )}
          </div>
          <div style={{ margin: "0", padding: "0" }}>
            <div className="pop-up-label"> Discount %</div>

            {editForm ? (
              <NumberInput
                displayValue={productDiscount.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.trim() === "") {
                    setProductDiscount("0");
                    return;
                  }
                  setProductDiscount(
                    e.currentTarget.value.replace(/[^\d\.]/g, "")
                  );
                }}
                onBlur={() => {
                  setProductDiscount(`${Number(productDiscount)} %`);
                }}
                incrementState={() => {
                  setProductDiscount(`${Number(productDiscount) + 1} %`);
                }}
                decrementState={() => {
                  setProductDiscount(`${Number(productDiscount) - 1} %`);
                }}
                placeHolder="Type product dicount (optional)"
              />
            ) : (
              <label className="pop-up-label" onClick={handleAllowModify}>
                {selectedProduct.discount} %
              </label>
            )}
          </div>
        </div>
        {!id  && <div>
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" onChange={
            (e : any) => { 
              setProductImage(e.currentTarget.files[0])
            }
          }/>
        </div>}
      </div>
      <button
        className="auth-btn"
        onClick={!id ? CreateProduct : ModifyProduct}
      >
        {!id ? "New Product" : "Update Product"}
      </button>
      <ToastContainer />
    </div>
  );
};

export default ProductPop;
