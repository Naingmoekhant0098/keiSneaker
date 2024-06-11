import axios from "axios";

import {
  Accordion,
  Checkbox,
  Drawer,
  Button,
  Dropdown,
  Select,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import {
  HiBars2,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiSquaresPlus,
} from "react-icons/hi2";
import { IoIosSwitch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import AddCard from "../components/AddCard";
import { useSelector } from "react-redux";

const AllProducts = ({ setShowAuth }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [shoes, setShoes] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const [searchParams, setSearchParams] = useState();
  const location = useLocation();
  const [clickData, setClickData] = useState(null);
  const cat = new URLSearchParams(location.search);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState("");
  const [orderOrder, setOrderOrder] = useState("desc");
  const [total, setProuducts] = useState(0);
  const handleClose = () => setIsOpen(false);
  const [user, setUser] = useState(null);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const rest = await axios.get(
        `https://keisneaker-8da6.onrender.com/user/getUsers?userId=${currentUser?._id}`
      );
      if (rest.status == 200) {
        setUser(rest.data.users[0]);
      }
    };
    fetchUser();
  }, [currentUser]);
  const addToWatchList = async (id) => {
    if (!currentUser) {
      setShowAuth(true);
    }

    try {
      const resData = await axios.put(
        `https://keisneaker-8da6.onrender.com/user/addWatchlist`,
        { postId: id, userId: currentUser?._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (resData.status === 200) {
        setUser({ ...user, watchLists: resData.data.user.watchLists });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [backDrop, setBackDrop] = useState(true);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        setBackDrop(false);
        setIsOpen(false);
      } else {
        setBackDrop(true);
      }
    });
  }, [window.innerWidth]);
  useEffect(() => {
    // setSearchParams({ ...searchParams, category: cat.get("category") });

    // if (
    //   cat.get("category") ||
    //   cat.get("brands") ||
    //   cat.get("activity") ||
    //   cat.get("colors") ||
    //   cat.get("collections") ||
    //   cat.get("heights") ||
    //   cat.get("price") ||
    //   cat.get("genders") ||
    //   cat.get("sizes") ||
    //   cat.get("searchTerm")
    // ) {
      setSearchParams({
        ...searchParams,
        category: cat.get("category")?.split(",") || [cat.get("category")],
        brands: cat.get("brands")?.split(",") || [],
        activity: cat.get("activity"),
        colors: cat.get("colors")?.split(",") || [],
        collections: cat.get("collections")?.split(",") || [],
        heights: cat.get("heights")?.split(",") || [],
        prices: cat.get("prices"),
        searchTerm: cat.get("searchTerm"),
        sizes: cat.get("sizes")?.split(",") || [],
      });
   // }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = cat.toString();
      try {
        const res = await axios.get(
          `https://keisneaker-8da6.onrender.com/product/getProducts?${searchQuery}&order=${orderOrder}&limit=12`
        );

        if (res.status === 200) {
          setShoes(res.data.shoes);
          setProuducts(res.data.totalProducts);
          if (res.data.shoes.length < 12) {
            setLoadMore(false);
          } else {
            setLoadMore(true);
          }
        }
      } catch (error) {}
    };
    fetchData();
  }, [location.search, orderOrder]);

  const loadMoreHandler = async () => {
    try {
      const searchQuery = cat.toString();
      const res = await axios.get(
        `https://keisneaker-8da6.onrender.com/product/getProducts?${searchQuery}&order=${orderOrder}&startIndex=${shoes.length}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setShoes((prev) => [...prev, ...res.data.shoes]);
        if (res.data.shoes.length < 12) {
          setLoadMore(false);
        } else {
          setLoadMore(true);
        }
      }
    } catch (error) {}
  };

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
      value: "chaos fushcia",
      label: "Chaos Fushcia",
    },
    {
      value: "iceberg_green",
      label: "Iceberg Green",
    },
  ];
  const categories = [
    { value: "men", label: "Man" },
    { value: "women", label: "Woman" },
    { value: "unisex", label: "Unisex" },
    { value: "kids", label: "Kid" },
  ];
  const collections = [
    { value: "air force 1", label: "Air force 1" },
    { value: "jordan editions", label: "Jordan editions" },
    { value: "nike dunk", label: "Nike dunk" },
    { value: "air max", label: "Air max" },
    { value: "blazer", label: "Blazer" },
    { value: "nike zoom fly", label: "Nike zoom fly" },
    { value: "conver chunk", label: "Converse Chunk" },
    { value: "classic slip-on", label: "Classic Slip-On" },
    {
      value: "old skool",
      label: "Old Skool",
    },
    {
      value: "authentic shoe",
      label: "Authentic Shoe",
    },
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

    { value: "walking", label: "Walking" },
    { value: "soccer", label: "Soccer" },
    { value: "football", label: "Football" },
    { value: "tennis", label: "Tennis" },
    { value: "sandals & slides", label: "Sandals & Slides" },
    { value: "training & Gym", label: "Training & Gym" },
  ];
  const hights = [
    { value: "low top", label: "Low Top" },
    { value: "mid top", label: "Mid Top" },
    { value: "high top", label: "High Top" },
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigate = useNavigate();
  const onChange = (e, val) => {
    if (e.target.id == "activities") {
     
      setSearchParams({
        ...searchParams,
        activity: val,
      });
      cat.set("activity", val);
      navigate(`/shops?${cat.toString()}`, { replace: true });
    }

    if (e.target.id === "gender") {
      
      if (e.target.checked) {
        setSearchParams({
          ...searchParams,
          category: [...searchParams.category, e.target.value],
        });

        cat.set(
          "category",
          [...searchParams.category, e.target.value].join(",")
        );
        navigate(`/shops?${cat.toString()}`, { replace: true });
      } else {
        setSearchParams({
          ...searchParams,
          category : searchParams?.category.filter((t) => t !== e.target.value),
        });
        const deletedData = searchParams?.category.filter(
          (t) => t !== e.target.value
        );

   
        if (deletedData.length > 0) {
          cat.set("category", deletedData.join(","));
        } else {
          cat.delete("category");
        }
        navigate(`/shops?${cat.toString()}`, { replace: true });
      }
    }

    if (e.target.id == "colors") {
      const isClicked = searchParams.colors.find((id) => id === val);

      if (isClicked) {
        setSearchParams({
          ...searchParams,
          colors: searchParams.colors.filter((t) => t !== val),
        });
        const deletedData = searchParams.colors.filter((t) => t !== val);

        if (deletedData > 0) {
          cat.set("colors", deletedData.join(","));
        } else {
          cat.delete("colors");
        }
        navigate(`/shops?${cat.toString()}`, { replace: true });
      } else {
        setSearchParams({
          ...searchParams,
          colors: [...searchParams.colors, val],
        });

        cat.set("colors", [...searchParams.colors, val].join(","));
        navigate(`/shops?${cat.toString()}`, { replace: true });
      }
    }

    if (e.target.id == "sizes") {
      const isClicked = searchParams.sizes.find((id) => id === val);

      if (isClicked) {
        setSearchParams({
          ...searchParams,
          sizes: searchParams.sizes.filter((t) => t !== val),
        });
        const deletedData = searchParams.sizes.filter((t) => t !== val);
        if (deletedData.length > 0) {
          cat.set("sizes", deletedData.join(","));
        } else {
          cat.delete("sizes");
        }
        navigate(`/shops?${cat.toString()}`, { replace: true });
      } else {
        setSearchParams({
          ...searchParams,
          sizes: [...searchParams.sizes, val],
        });

        cat.set("sizes", [...searchParams.sizes, val].join(","));
        navigate(`/shops?${cat.toString()}`, { replace: true });
      }
    }

    if (e.target.id === "price") {
      if (e.target.checked) {
        setSelectedPrice(e.target.value);
        setSearchParams({
          ...searchParams,
          price: e.target.value,
        });

        cat.set("prices", e.target.value);
        navigate(`/shops?${cat.toString()}`, { replace: true });
      } else {
        setSelectedPrice("");
        setSearchParams({
          ...searchParams,
          price: "",
        });
        cat.delete("prices");
        navigate(`/shops?${cat.toString()}`);
      }
    }

    if (e.target.id === "brand") {
      if (e.target.checked) {
        setSearchParams({
          ...searchParams,
          brands: [...searchParams?.brands, e.target.value],
        });

        cat.set("brands", [...searchParams?.brands, e.target.value].join(","));
        navigate(`/shops?${cat.toString()}`, { replace: true });
      } else {
        setSearchParams({
          ...searchParams,
          brands: searchParams?.brands.filter((t) => t !== e.target.value),
        });

        const deletedData = searchParams?.brands.filter(
          (t) => t !== e.target.value
        );

        if (deletedData.length > 0) {
          cat.set("brands", deletedData.join(","));
        } else {
          cat.delete("brands");
        }
        navigate(`/shops?${cat.toString()}`, { replace: true });
      }
    }
    if (e.target.id === "heigh") {
      if (e.target.checked) {
        setSearchParams({
          ...searchParams,
          heights: [...searchParams.heights, e.target.value],
        });

        cat.set("heights", [...searchParams.heights, e.target.value].join(","));
        navigate(`/shops?${cat.toString()}`, { replace: true });
      } else {
        setSearchParams({
          ...searchParams,
          heights: searchParams?.heights.filter((t) => t !== e.target.value),
        });

        const deletedData = searchParams?.heights.filter(
          (t) => t !== e.target.value
        );

        if (deletedData.length > 0) {
          cat.set("heights", deletedData.join(","));
        } else {
          cat.delete("heights");
        }
        navigate(`/shops?${cat.toString()}`, { replace: true });
      }
    }

    if (e.target.id === "collections") {
      if (e.target.checked) {
        setSearchParams({
          ...searchParams,
          collections: [...searchParams.collections, e.target.value],
        });

        cat.set(
          "collections",
          [...searchParams.collections, e.target.value].join(",")
        );
        navigate(`/shops?${cat.toString()}`, { replace: true });
      } else {
        setSearchParams({
          ...searchParams,
          collections: searchParams?.collections.filter(
            (t) => t !== e.target.value
          ),
        });

        const deletedData = searchParams?.collections.filter(
          (t) => t !== e.target.value
        );

        if (deletedData.length > 0) {
          cat.set("collections", deletedData.join(","));
        } else {
          cat.delete("collections");
        }
        navigate(`/shops?${cat.toString()}`, { replace: true });
      }
    }
  };

  const submitFilter = () => {
    setIsOpen(false);
  };

  const clearFilter = () => {
    setSearchParams({
      ...searchParams,
      category: cat.set("category", []),
      brands: cat.set("brands", []),
      activity: cat.set("activity", ""),
      colors: cat.set("colors", []),
      collections: cat.set("collections", []),
      heights: cat.set("heights", []),
      prices: cat.set("prices", ""),
      sizes: cat.set("sizes", []),
    });

    cat.delete("category");
    cat.delete("brands");
    cat.delete("activity");
    cat.delete("collections");
    cat.delete("heights");
    cat.delete("prices");
    cat.delete("colors");
    cat.delete("sizes");

    navigate(`/shops?${cat.toString()}`, { replace: true });
    setIsOpen(false);
  };

  return (
    <>
      <div className=" w-full mt-28 h-full  md:px-14">
        <div className=" flex justify-between mt-8  px-4 md:px-0">
          <div
            className=" capitalize md:text-2xl font-semibold flex flex-col"
            style={{ letterSpacing: 0 }}
          >
            Kei's Shoes & Sneakers{" "}
            {searchParams?.searchTerm && (
              <div className=" text-sm font-medium opacity-80">
                Search results for : {searchParams?.searchTerm}
              </div>
            )}
            {/* <span className=" hidden md:block">({total})</span> */}
          </div>

          <div className=" cursor-pointer ">
            <div className=" hidden md:block lg:block">
              <Select
                value={orderOrder}
                onChange={(e) => setOrderOrder(e.target.value)}
              >
                <option value={"asc"}>
                  <span className=" text-[12px]">Earlist</span>
                </option>
                <option value={"desc"}>
                  <span className=" text-[16px]">Latest</span>
                </option>
              </Select>
            </div>
            <div
              className=" border px-4 py-1 rounded-full border-black flex items-center gap-2 cursor-pointer md:hidden lg:hidden text-[16px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className=" block ">Filter</span>
              <span>{<IoIosSwitch />}</span>
            </div>
          </div>
        </div>

        <div className=" flex items-center  px-5  overflow-auto   gap-6 w-full    capitalize no-scrollbar mt-4  md:hidden lg:hidden">
          {activities.map((col, index) => {
            return (
              <div
                id="activities"
                onClick={(e) => {
                  onChange(e, col.value);
                }}
                key={index}
                className=" text-[16px] cursor-pointer  hover:text-gray-700"
              >
                {col.value}
              </div>
            );
          })}
        </div>

        <div className="w-full flex  mt-10 relative">
          <div className=" w-52 hidden md:block sticky top-0 left-0  h-screen overflow-y-auto scrolll">
            <div className=" flex flex-col gap-3 w-full 0  capitalize">
              {activities.map((col, index) => {
                return (
                  <div
                    id="activities"
                    onClick={(e) => {
                      onChange(e, col.value);
                    }}
                    key={index}
                    className=" text-[16px] cursor-pointer  hover:text-gray-700"
                  >
                    {col.value}
                  </div>
                );
              })}
            </div>

            <Accordion
              collapseAll
              className=" text-[16px] pl-2 pr-6 mt-10  flex flex-col gap-3 w-full 0  capitalize border-none"
            >
              <Accordion.Panel>
                <Accordion.Title className=" p-0 focus:ring-0 bg-transparent  hover:bg-transparent text-black">
                  Genders
                </Accordion.Title>
                <Accordion.Content className=" border-0 p-0">
                  {categories.map((cot, index) => {
                    return (
                      <div
                        key={index}
                        className=" mt-2 flex gap-2 items-center cursor-pointer"
                      >
                        <Checkbox
                          label="Hello"
                          id="gender"
                          onClick={onChange}
                          value={cot.value}
                          defaultChecked={searchParams?.category?.includes(
                            cot.value
                          )}
                        />
                        {cot.value}
                      </div>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion
              collapseAll
              className=" text-[16px] pl-2 pr-6 mt-6  flex flex-col gap-3 w-full 0  capitalize border-none"
            >
              <Accordion.Panel>
                <Accordion.Title className=" p-0 focus:ring-0 bg-transparent  hover:bg-transparent text-black">
                  Colors
                </Accordion.Title>
                <Accordion.Content className=" border-0 p-0 setSelectedColor  pt-5">
                  <div className="  grid grid-cols-3 gap-4">
                    {options &&
                      options.map((color, index) => {
                        return (
                          <div key={index}>
                            <div
                              id="colors"
                              onClick={(e) => {
                                onChange(e, color.value);
                              }}
                              className={` w-8 h-8   rounded-full border  cursor-pointer    hover:border-black  ${
                                color.value
                              }  ${
                                searchParams?.colors?.includes(color.value)
                                  ? "border-black border-2"
                                  : "border-slate-400"
                              }`}
                            ></div>
                            <span className=" text-sm">{color.label}</span>
                          </div>
                        );
                      })}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion
              collapseAll
              className=" text-[16px] pl-2 pr-6 mt-6  flex flex-col gap-3 w-full 0  capitalize border-none"
            >
              <Accordion.Panel>
                <Accordion.Title className=" p-0 focus:ring-0 bg-transparent  hover:bg-transparent text-black">
                  Sizes
                </Accordion.Title>
                <Accordion.Content className=" border-0 p-0 pt-3">
                  <div className=" mt-3  grid grid-cols-3  gap-4 pl-0 px-4 text-center">
                    {sizes &&
                      sizes.map((siz, index) => {
                        return (
                          <div
                            key={index}
                            id="sizes"
                            onClick={(e) => {
                              onChange(e, siz.value);
                            }}
                            className={`text-sm border-2 cursor-pointer border-gray-500 p-1 md:p-2 py-1 rounded transition duration-300 hover:bg-black hover:text-white hover:border-black ${
                              searchParams?.sizes?.includes(siz.value) &&
                              "bg-black text-white border-black"
                            }`}
                          >
                            {siz.value}
                          </div>
                        );
                      })}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion
              collapseAll
              className=" text-[16px] pl-2 pr-6 mt-6  flex flex-col gap-3 w-full 0  capitalize border-none"
            >
              <Accordion.Panel>
                <Accordion.Title className=" p-0 focus:ring-0 bg-transparent  hover:bg-transparent text-black">
                  Shop By Price
                </Accordion.Title>
                <Accordion.Content className=" border-0 p-0">
                  <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                    <Checkbox
                      label="Hello"
                      id="price"
                      onClick={onChange}
                      value={"0-25"}
                      checked={selectedPrice === "0-25"}
                    />
                    <span>$0 - $25</span>
                  </div>

                  <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                    <Checkbox
                      label="Hello"
                      id="price"
                      onClick={onChange}
                      value={"25-50"}
                      checked={selectedPrice === "25-50"}
                    />
                    <span> $25 - $50</span>
                  </div>

                  <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                    <Checkbox
                      label="Hello"
                      id="price"
                      onClick={onChange}
                      value={"50-100"}
                      checked={selectedPrice === "50-100"}
                    />
                    <span>$50 - $100</span>
                  </div>

                  <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                    <Checkbox
                      label="Hello"
                      id="price"
                      onClick={onChange}
                      value={"100-150"}
                      defaultChecked={selectedPrice === "100-150"}
                    />
                    <span>$100 - $150</span>
                  </div>

                  <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                    <Checkbox
                      label="Hello"
                      id="price"
                      onClick={onChange}
                      value={"150-250"}
                      checked={selectedPrice === "150-250"}
                    />
                    <span>$150 - $250 </span>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion
              collapseAll
              className=" text-[16px] pl-2 pr-6 mt-6  flex flex-col gap-3 w-full 0  capitalize border-none"
            >
              <Accordion.Panel>
                <Accordion.Title className=" p-0 focus:ring-0 bg-transparent  hover:bg-transparent text-black">
                  Brands
                </Accordion.Title>
                <Accordion.Content className=" border-0 p-0">
                  {brands.map((cot, index) => {
                    return (
                      <div
                        key={index}
                        className=" mt-2 flex gap-2 items-center cursor-pointer"
                      >
                        <Checkbox
                          label="Hello"
                          id="brand"
                          onClick={onChange}
                          value={cot.value}
                          defaultChecked={searchParams?.brands?.includes(
                            cot.value
                          )}
                        />
                        {cot.value}
                      </div>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion
              collapseAll
              className=" text-[16px] pl-2 pr-6 mt-6  flex flex-col gap-3 w-full 0  capitalize border-none"
            >
              <Accordion.Panel>
                <Accordion.Title className=" p-0 focus:ring-0 bg-transparent  hover:bg-transparent text-black">
                  Shoe Height
                </Accordion.Title>
                <Accordion.Content className=" border-0 p-0">
                  {hights.map((cot, index) => {
                    return (
                      <div
                        key={index}
                        className=" mt-2 flex gap-2 items-center cursor-pointer"
                      >
                        <Checkbox
                          label="Hello"
                          id="heigh"
                          onClick={onChange}
                          value={cot.value}
                          checked={searchParams?.heights?.includes(cot.value)}
                        />
                        {cot.value}
                      </div>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion
              collapseAll
              className=" text-[16px] pl-2 pr-6 mt-6  flex flex-col gap-3 w-full 0  capitalize border-none"
            >
              <Accordion.Panel>
                <Accordion.Title className=" p-0 focus:ring-0 bg-transparent  hover:bg-transparent text-black">
                  Collections
                </Accordion.Title>
                <Accordion.Content className=" border-0 p-0">
                  {collections.map((cot, index) => {
                    return (
                      <div
                        key={index}
                        className=" mt-2 flex gap-2 items-center cursor-pointer"
                      >
                        <Checkbox
                          label="Hello"
                          id="collections"
                          onClick={onChange}
                          value={cot.value}
                          defaultChecked={searchParams?.collections?.includes(
                            cot.value
                          )}
                        />
                        {cot.value}
                      </div>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className="w-full">
            <div className=" w-full h-full md:pl-6 grid grid-cols-2 md:grid-cols-4 md:flex-1 gap-4 md:gap-5  ">
              {shoes?.map((data, index) => {
                return (
                  <div key={index} className="  md:w-72  cursor-pointer">
                    <div className=" relative group ">
                      <Link to={`/shop/${data?.slug}`}>
                        <img
                          src={data?.photos[0]}
                          alt=""
                          className="w-full h-[250px] md:h-[350px] object-cover"
                        />

                        <img
                          src={data?.photos[1]}
                          alt=""
                          className="w-full h-full object-cover transition duration-500 absolute top-0 opacity-0 group-hover:opacity-100"
                        />
                      </Link>
                      <HiOutlineHeart
                        className={` rounded-full p-[2px]  absolute top-3 right-3 text-2xl transition duration-300 cursor-pointer md:hover:scale-125 ${
                          user &&
                          user?.watchLists?.includes(data?._id) &&
                          " bg-black text-white"
                        }`}
                        onClick={() => addToWatchList(data?._id)}
                      />
                      <div className=" hidden md:block">
                        <span
                          className="absolute   transition duration-500  bottom-3 right-5 flex items-center gap-2  px-2 py-2 opacity-0 group-hover:opacity-100 bg-white hover:bg-black hover:text-white
                  "
                          onClick={() => {
                            setShowCard(true), setClickData(data);
                          }}
                        >
                          <span className=" border-r-2 border-gray-500 px-2 text-sm font-medium">
                            Add To Bag
                          </span>

                          <HiOutlineShoppingBag className="  text-xl cursor-pointer " />
                        </span>
                      </div>
                    </div>
                    <div className=" px-2">
                      <div className=" mt-2 text-[16px] font-semibold w-full text-wrap hover:underline cursor-pointer line-clamp-2">
                        {data?.name}
                      </div>
                      <div className=" mt-1 text-sm font-medium text-gray-900">
                        <span
                          className={` ${
                            data?.isOnSale && "line-through opacity-70 text-sm"
                          }`}
                        >
                          ${data?.price}
                        </span>
                        {data?.isOnSale && (
                          <span className="ms-3">${data?.onSalePrice}</span>
                        )}
                      </div>
                      <div
                        className="  mt-1 font-medium text-gray-600 uppercase"
                        style={{ fontSize: "10px" }}
                      >
                        {data?.category} {data?.heigh} shoe
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full  mt-6    flex items-center justify-center">
            {loadMore && (
              <div
                className=" text-center text-sm cursor-pointer "
                onClick={loadMoreHandler}
              >
                Load More
              </div>
            )}
          </div>
          </div>
         
        </div>
      </div>
      {showCard && <AddCard setShowCard={setShowCard} clickData={clickData} />}
      <Drawer
        open={isOpen}
        onClose={handleClose}
        backdrop={backDrop}
        position="bottom"
        className="p-0 pl-3 h-[100%] md:hidden"
      >
        <Drawer.Items className="p-4">
          <div className=" flex-1">
            <div className="  w-full flex justify-end">
              <RxCross2
                className=" text-2xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className=" text-lg font-medium">Filter</div>

            <div className=" mt-5 mb-5">
              <div className=" text-lg">Categories</div>
              {categories.map((cot, index) => {
                return (
                  <div
                    key={index}
                    className=" mt-2 flex gap-2 items-center cursor-pointer"
                  >
                    <Checkbox
                      label="Hello"
                      id="gender"
                      onClick={onChange}
                      value={cot.value}
                      defaultChecked={searchParams?.category?.includes(
                        cot.value
                      )}
                    />
                    {cot.label}
                  </div>
                );
              })}
            </div>
            <hr />

            <div className=" mt-4 mb-5">
              <div className=" text-lg">Shop by Price</div>
              <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                <Checkbox
                  label="Hello"
                  id="price"
                  onClick={onChange}
                  value={"0-25"}
                  checked={selectedPrice === "0-25"}
                />
                <span>$0 - $25</span>
              </div>

              <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                <Checkbox
                  label="Hello"
                  id="price"
                  onClick={onChange}
                  value={"25-50"}
                  checked={selectedPrice === "25-50" && true}
                />
                <span> $25 - $50</span>
              </div>

              <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                <Checkbox
                  label="Hello"
                  id="price"
                  onClick={onChange}
                  value={"50-100"}
                  checked={selectedPrice === "50-100"}
                />
                <span>$50 - $100</span>
              </div>

              <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                <Checkbox
                  label="Hello"
                  id="price"
                  onClick={onChange}
                  value={"100-150"}
                  checked={selectedPrice === "100-150"}
                />
                <span>$100 - $150</span>
              </div>

              <div className=" mt-2 flex gap-2 items-center cursor-pointer">
                <Checkbox
                  label="Hello"
                  id="price"
                  onClick={onChange}
                  value={"150-250"}
                  checked={selectedPrice === "150-250"}
                />
                <span>$150 - $250 </span>
              </div>
            </div>
            <hr />

            <div className=" mt-4 mb-5">
              <div className=" text-lg">Collections</div>
              {collections.map((cot, index) => {
                return (
                  <div
                    key={index}
                    className=" mt-2 flex gap-2 items-center cursor-pointer"
                  >
                    <Checkbox
                      label="Hello"
                      id="collections"
                      onClick={onChange}
                      value={cot.value}
                      defaultChecked={searchParams?.collections?.includes(
                        cot.value
                      )}
                    />
                    {cot.label}
                  </div>
                );
              })}
            </div>
            <hr />

            <div className=" mt-4 mb-5">
              <div className=" text-lg">Colors</div>
              <div className="  grid grid-cols-6   gap-4 mt-2 place-items-center">
                {options &&
                  options.map((color, index) => {
                    return (
                      <div className=" w-8" key={index}>
                        <div
                          key={index}
                          id="colors"
                          onClick={(e) => {
                            onChange(e, color.value);
                          }}
                          className={` w-8 h-8   rounded-full border  cursor-pointer    hover:border-black  ${
                            color.value
                          }  ${
                            searchParams?.colors?.includes(color.value)
                              ? "border-black border-2"
                              : "border-slate-400"
                          }`}
                        ></div>
                        <span className=" text-sm text-wrap line-clamp-2">
                          {color.label}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <hr />

            <div className=" mt-4 mb-5">
              <div className=" text-lg">Sizes</div>
              <div className=" mt-3  grid grid-cols-7  gap-4 pl-0 px-4">
                {sizes &&
                  sizes.map((siz, index) => {
                    return (
                      <div
                        key={index}
                        id="sizes"
                        onClick={(e) => {
                          onChange(e, siz.value);
                        }}
                        className={`text-sm border-2 cursor-pointer text-center border-gray-500 p-1 md:p-2 py-1 rounded transition duration-300 hover:bg-black hover:text-white hover:border-black ${
                          searchParams?.sizes?.includes(siz.value) &&
                          "bg-black text-white border-black"
                        }`}
                      >
                        {siz.value}
                      </div>
                    );
                  })}
              </div>
            </div>
            <hr />

            <div className=" mt-4 mb-5">
              <div className=" text-lg">Brands</div>
              {brands.map((cot, index) => {
                return (
                  <div
                    key={index}
                    className=" mt-2 flex gap-2 items-center cursor-pointer"
                  >
                    <Checkbox
                      label="Hello"
                      id="brand"
                      onClick={onChange}
                      value={cot.value}
                      defaultChecked={searchParams?.brands?.includes(cot.value)}
                    />
                    {cot.value}
                  </div>
                );
              })}
            </div>
            <hr />

            <div className=" mt-4 mb-5">
              <div className=" text-lg">Shoe Height</div>
              {hights.map((cot, index) => {
                return (
                  <div
                    key={index}
                    className=" mt-2 flex gap-2 items-center cursor-pointer"
                  >
                    <Checkbox
                      label="Hello"
                      id="heigh"
                      onClick={onChange}
                      value={cot.value}
                      defaultChecked={searchParams?.heights?.includes(
                        cot.value
                      )}
                    />
                    {cot.value}
                  </div>
                );
              })}
            </div>
            <hr />
          </div>

          <div className=" px-4 py-5 flex items-center gap-3">
            <button
              onClick={clearFilter}
              className=" flex-1 py-2 border-black cursor-pointer  w-[50%] border rounded-full"
            >
              Clear
            </button>
            <button
              className=" bg-black text-white cursor-pointer flex-1 w-[50%] py-2  border rounded-full"
              onClick={submitFilter}
            >
              Apply
            </button>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default AllProducts;
