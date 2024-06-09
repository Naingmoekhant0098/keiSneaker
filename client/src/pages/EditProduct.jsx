import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import makeAnimated from "react-select/animated";
import {
  Breadcrumb,
  Button,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { app } from "../firebase";
import { RxCross2 } from "react-icons/rx";

const EditProduct = () => {
  const options = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "milk", label: "Milk" },
    { value: "yellow", label: "Yellow" },
    { value: "pink", label: "Pink" },
    { value: "sky blue", label: "Sky blue" },
    { value: "purple", label: "Purple" },
    { value: "gold", label: "Gold" },
    { value: "egret", label: "Egret" },
    { value: "silver", label: "Silver" },
    { value: "light_field_surplus", label: "Light Field Surplus" },
    {
      value : "chaos_fushcia" , label : "Chaos Fushcia"
    },
     
    {
      value :'iceberg_green' , label : "Iceberg Green"
    }
  ];
  const categories = [
    { value: "Man", label: "Man" },
    { value: "Woman", label: "Woman" },
    { value: "Unisex", label: "Unisex" },
    { value: "Kid", label: "Kid" },
  ];
  const collections = [
    { value: "air force 1", label: "Air force 1" },
    { value: "jordan editions", label: "Jordan editions" },
    { value: "nike dunk", label: "Nike dunk" },
    { value: "air max", label: "Air max" },
    { value: "blazer", label: "Blazer" },
    { value: "nike zoom fly", label: "Nike zoom fly" },
    { value: "conver chunk", label: "Converse Chunk" },
    {
      value : "old skool" , label : "Old Skool"
    },
    {
      value :"authentic shoe",label : "Authentic Shoe"
    }
  ];
  const brands = [
    { value: "nike", label: "Nike" },
    { value: "addidas", label: "Addidas" },
    { value: "H&M", label: "H&M" },
    { value: "vans", label: "Vans" },
    { value: "gucci", label: "Gucci" },
    { value: "converse", label: "Converse" },
    { value: "the north face", label: "The north face" },
    { value: "prada", label: "Prada" },
  ];
  const activities = [
    { value: "lifestyle", label: "Lifestyle" },
    { value: "running", label: "Running" },
    { value: "basketball", label: "Basketball" },
    { value: "training & Gym", label: "Training & Gym" },
    { value: "walking", label: "Walking" },
    { value: "soccer", label: "Soccer" },
    { value: "football", label: "Football" },
    { value: "tennis", label: "Tennis" },
    { value: "sandals & slides", label: "Sandals & Slides" },
  ];
  const hights = [
    { value: "low top", label: "Low Top" },
    { value: "mid top", label: "Mid Top" },
    { value: "High top", label: "High Top" },
  ];
  const sizes = [
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "32" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
    { value: "38", label: "38" },
    { value: "39", label: "39" },
    { value: "40", label: "40" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
    { value: "43", label: "43" },
  ];
  const animatedComponents = makeAnimated();
  const [files, setFiles] = useState();
  const [images, setImages] = useState([]);
  const [imageProgress, setImageProgress] = useState(0);
  const storage = getStorage(app);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [editId, setEditId] = useState();
  const [quillData,setQuillData] = useState('')
  const uploadImage = async () => {
    const toastId = toast.loading("Uploading Images");
    for (let i = 0; i < files.length; i++) {
      const storateRef = ref(
        storage,
        new Date().getTime() + "_" + files[i].name
      );
      const uploadTask = uploadBytesResumable(storateRef, files[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) /
            files.length;

          if (progress === 100 / files.length) {
            setImageProgress((prev) => prev + Number(progress.toFixed(0)));
            toast.success(`Uploaded Image ${i + 1}`);
            toast.dismiss(toastId);
          }

          // setUploadFileProgress(progress.toFixed(0))
        },
        (error) => {
          console.log(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImages((prev) => [...prev, downloadUrl]);
          });
        }
      );
    }
  };
  const selectHander = (selectedOption, action) => {
    if (action.name === "brand") {
      setData({ ...data, brand: selectedOption.value });
    }
    if (action.name === "category") {
      setData({ ...data, category: selectedOption.value });
    }
    if (action.name === "collection") {
      setData({ ...data, collection: selectedOption.value });
    }
    if (action.name === "activity") {
      setData({ ...data, activity: selectedOption.value });
    }
    if (action.name === "colors") {
      let colors = selectedOption.map((gen) => gen.value);
      setData({ ...data, colors: colors });
    }
    if (action.name === "sizes") {
      let sizes = selectedOption.map((gen) => gen.value);
      setData({ ...data, sizes: sizes });
    }
    if (action.name === "heigh") {
      setData({ ...data, heigh: selectedOption.value });
    }
  };
  const removeImage = (id) => {
    const test = images.filter((res, index) => index != id);
    setImages(test);
  };
  const clearRef = useRef();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/product/getProducts?slug=${editId}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setData(res.data.shoes[0]);
          setQuillData(res.data.shoes[0].description);
          setImages(res.data.shoes[0].photos);
        }
      } catch (error) {}
    };
    fetchData();
  }, [editId]);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/product/editProduct/${data?._id}`,
        { ...data, images: images , description : quillData },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        // navigate('/dashboard?tab=products');
        toast(" Updeated successfully",{
            icon :'🥂',
        });
      }
    } catch (error) {}
  };
  const location = useLocation();
  useEffect(() => {
    const id = new URLSearchParams(location.search);
    setEditId(id.get("slug"));
  }, [location.search]);

  return (
    <div className="py-2 md:p-4 md:-ml-8 mt-14 ">
      <div className=" mb-10">
        <Breadcrumb aria-label="Default breadcrumb example">
         
          <Breadcrumb.Item  >
            <Link to={'/dashboard?tab=dash'}>
            Dashboard
            </Link>
            
           </Breadcrumb.Item>
           
          <Breadcrumb.Item  >  
            <Link to={'/dashboard?tab=products'}>
            Products
            </Link>
            
           </Breadcrumb.Item> 
          <Breadcrumb.Item >Edit Product</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" text-xl font-medium text-center mb-10">Edit Product</div>
      <form
        action=""
        onSubmit={submitHandler}
        className=" mx-auto w-full md:w-[800px] p-6 bg-white shadow rounded-lg"
      >
        <div className="mb-3 flex items-center gap-3 ">
          <div className=" mb-3 flex-1">
            <Label>Product Name</Label>
            <TextInput
              value={data?.name}
              className=" mt-2"
              placeholder="Product Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
          <div className=" mb-3">
            <Label>Ribbon</Label>
            <TextInput
              value={data?.ribbon}
              className=" mt-2"
              placeholder="Product Ribbon"
              onChange={(e) => setData({ ...data, ribbon: e.target.value })}
            />
          </div>
        </div>
        <div className=" mb-3">
          <Label>Product Code</Label>
          <TextInput
            value={data?.code}
            className=" mt-2"
            
            required
            placeholder="Product Code"
            onChange={(e) => setData({ ...data, code: e.target.value })}
          />
        </div>
        <div className=" mb-3">
          <Label>Product Price</Label>
          <TextInput
            value={data?.price}
            type="number"
            required
            className=" mt-2"
            placeholder="Product Price"
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
        </div>
        <div className=" mb-3">
          <Label>Product Short Description</Label>
          <Textarea
            value={data?.short_description}
            className=" mt-2"
            required
            placeholder="Product Short Description"
            onChange={(e) =>
              setData({ ...data, short_description: e.target.value })
            }
          />
        </div>
        <div className=" mb-3">
          <Label>Product Description</Label>
          <ReactQuill theme="snow"
          className="mt-2"
          value={quillData}
          onChange={(e) => setQuillData(e)}
          />

          {/* <Textarea
            value={data?.description}
            className=" mt-2"
            required
            placeholder="Product Description"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          /> */}
        </div>
        <div className=" mb-3">
          <Label>Choose images</Label>
          <div className=" mt-2 flex items-center gap-3 justify-between">
            <FileInput
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className=" text-sm flex-1"
              
            />
            <div
              onClick={uploadImage}
              className="py-3 px-4 text-center    bg-black rounded cursor-pointer border text-white transition duration-500 hover:bg-white uppercase text-sm hover:border-black hover:text-black"
            >
              Upload
            </div>
          </div>
        </div>
        <div className="text-sm flex gap-6">
          {images?.length > 0 &&
            images?.map((img, index) => {
              return (
                <div className="relative my-2" key={index}>
                  <RxCross2
                    className=" absolute -top-3 -right-5 cursor-pointer"
                    onClick={() => removeImage(index)}
                  />
                  <img src={img} className="w-20 h-20" />
                </div>
              );
            })}
        </div>
        <div className="mb-3 flex items-center gap-3 ">
          <div className=" flex-1 ">
            <Label>Choose Brand</Label>
            <Select
              required
              name="brand"
              ref={clearRef}
              value={{ value: data?.brand, label: data?.brand }}
              onChange={selectHander}
              options={brands}
              components={animatedComponents}
              isClearable={true}
              placeholder="Choose Brands"
              className=" mt-2 text-sm"
            />
          </div>
          <div className="flex-1 ">
            <Label>Choose Category</Label>
            <Select
              required
              value={{ value: data?.category, label: data?.category }}
              name="category"
              onChange={selectHander}
              options={categories}
              components={animatedComponents}
              placeholder="Choose Category"
              isClearable={true}
              className=" mt-2 text-sm"
            />
          </div>
        </div>
        <div className=" mb-3">
          <Label>Choose Collections</Label>
          <Select
            required
            value={{ value: data?.collect, label: data?.collect }}
            name="collection"
            onChange={selectHander}
            options={collections}
            components={animatedComponents}
            placeholder="Choose Collections"
            className=" mt-2 text-sm"
            isClearable={true}
          />
        </div>
        <div className=" mb-3">
          <Label>Choose Activities</Label>
          <Select
            required
            value={{ value: data?.activity, label: data?.activity }}
            name="activity"
            onChange={selectHander}
            options={activities}
            components={animatedComponents}
            placeholder="Choose Activities"
            className=" mt-2 text-sm"
            isClearable={true}
          />
        </div>
        <div className="mb-3 flex items-center gap-3 ">
          <div className="flex-1">
            <Label>Choose Colors</Label>
            <Select
              required
              name="colors"
              value={data?.colors.map((col) => {
                return { value: col, label: col };
              })}
              onChange={selectHander}
              options={options}
              isClearable={true}
              closeMenuOnSelect={false}
              components={animatedComponents}
              placeholder="Choose colors"
              isMulti
              className=" mt-2 text-sm"
            />
          </div>

          <div className="flex-1">
            <Label>Choose Sizes</Label>
            <Select
              required
              value={data?.sizes.map((col) => {
                return { value: col, label: col };
              })}
              name="sizes"
              isClearable={true}
              onChange={selectHander}
              options={sizes}
              closeMenuOnSelect={false}
              components={animatedComponents}
              placeholder="Choose Sizes"
              isMulti
              className=" mt-2 text-sm"
            />
          </div>
        </div>
        <div className=" mb-3">
          <Label>Choose Shoe Height</Label>
          <Select
            required
            isClearable={true}
            value={{ value: data?.heigh, label: data?.heigh }}
            name="heigh"
            onChange={selectHander}
            options={hights}
            components={animatedComponents}
            placeholder="Choose Activities"
            className=" mt-2 text-sm"
          />
        </div>

        <div className=" w-full flex items-center justify-end">
          <button
            type="submit"
            className="py-3 px-4 text-center   bg-black rounded cursor-pointer border text-white transition duration-500 hover:bg-white uppercase text-sm hover:border-black hover:text-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
