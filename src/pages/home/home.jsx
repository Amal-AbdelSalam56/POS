import logo from '../../assets/logo.png';
import barcode from '../../assets/barcode.png';
import grpimg from '../../assets/Group.png';
import Shoe1 from '../../assets/itemimg.png';
import Button from '../../assets/Button.png';
import instance from '../../axios config/axios';
import { useEffect, useState } from 'react';
import Search from '../../assets/Search.png';


function Home() {


    const tableCellStyle = {
        padding: '10px',
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const [Groups, setGroups] = useState([]);
    const [Payments, setPayments] = useState([]);
    const [Delegates, setDelegates] = useState([]);
    const [Items, setItems] = useState([]);
    const [Boxs, setBoxs] = useState([]);
    const [Products, setProducts] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [clickedRow, setClickedRow] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [theRest, setTheRest] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [barcodeInput, setBarcodeInput] = useState('');
    const [SearchInput, setSearchInput] = useState('');

    // Function to handle changes in UnitConvert
    const handleUnitConvertChange = (index, newUnitConvert) => {

        const updatedProducts = [...Products];
        updatedProducts[index].UnitConvert = newUnitConvert;
        setProducts(updatedProducts);
        if (updatedProducts[index].UnitConvert == 0) {
            handleDeleteFromTable(index)
        }

    };

    useEffect(() => {
        // This function runs when the component mounts
        instance.get("get-groups")
            .then((res) => {
                // Handle successful response
                console.log(res.data.data);

                setGroups(res.data.data);
            })
            .catch((err) => {
                // Handle errors
                console.log(err);
            });

        instance.get("get-delegate-sales")
            .then((res) => {
                // Handle successful response
                console.log(res.data);

                setDelegates(res.data);
            })
            .catch((err) => {
                // Handle errors
                console.log(err);
            });

        instance.get("get-box")
            .then((res) => {
                // Handle successful response
                console.log(res.data.data);

                setBoxs(res.data.data);
            })
            .catch((err) => {
                // Handle errors
                console.log(err);
            });


        instance.get("get-payment")
            .then((res) => {
                // Handle successful response
                console.log(res.data);
                // setPayments(res.data);
            })
            .catch((err) => {
                // Handle errors
                console.log(err);
            });


    }, []);


    useEffect(() => {
        console.log("Updated Products:", Products);
        // Recalculate the total price
        const newTotalPrice = Products.reduce((total, product) => total + product.SalesPrice * product.UnitConvert, 0);
        setTotalPrice(newTotalPrice);
        if (newTotalPrice > 0) {
            setTheRest(newTotalPrice - inputValue)

        }
    }, [Products, inputValue]);

    useEffect(() => {
        if (totalPrice > 0) {
            setTheRest(totalPrice - inputValue);
        } else {
            setTheRest(0);
        }
    }, [totalPrice]);

    const handleGroupClick = (group) => {
        console.log(group.ID);
        setSelectedGroup(group);

        const param = group.ID;

        instance.get(`get-items?groupId=${param}`)
            .then((res) => {
                // Handle successful response
                console.log(res.data.data);

                setItems(res.data.data);
            })
            .catch((err) => {
                // Handle errors
                console.log(err);
            });

    };

    const handleProductClick = (product) => {
        const param = product.ID;

        instance.get(`get-items-details?itemID=${param}`)
            .then((res) => {
                if (res && res.data && res.data.data) {
                    console.log("Product:", res.data.data);
                    setProducts(prevProducts => prevProducts.concat(res.data.data));
                    setAllSalesPrice(res.data.data)

                } else {
                    console.error("Invalid response format:", res);
                }
            })
            .catch((err) => {
                console.error("Error fetching product details:", err);
                // Handle error display or logging as appropriate
            });
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDeleteFromTable = (index) => {
        setProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
    };

    const handleRowClick = (index) => {
        console.log(index);
        setClickedRow(index);
    };

    const handleResetClick = () => {
        setProducts([]); //reset table
        setInputValue(0)
    };

    const handleButtonClick = (value) => {
        setBarcodeInput(value);
    };

    useEffect(() => {
        if (barcodeInput) {
            // Define your API call function here
            instance.get(`get-items-barcode?barcode=${barcodeInput}`)
                .then((res) => {
                    // Handle successful response
                    console.log(res.data.data[0]);
                    const barProduct = res.data.data[0]
                    handleProductClick(barProduct)
                })
                .catch((err) => {
                    // Handle errors
                    console.log(err);
                });
        }

    }, [barcodeInput]);

    const getSearchResult = (value) => {
        instance.get(`get-items-name?name=${value}`)
            .then((res) => {
                console.log(res.data.data);
                // setItems(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // useEffect(() => {
    //     // Call getSearchResult whenever SearchInput changes
    //     getSearchResult();
    // }, [SearchInput]);

    return (
        <>

            {/* header */}
            <header className="flex justify-between items-center py-4 px-6 bg-white text-gray-800 border-b-2">
                {/* Left side with input */}
                <div className="items-center w-[90%] pr-[80px] ">
                    {/* First Line */}
                    <div dir="rtl" className="flex items-center space-x-4 justify-center bg-[#F5F6FA] rounded-[30px] p-[10px 14px]">

                        <label htmlFor="select1" className='text-[18px] text-black font-[500]'>اسم الزبون:</label>
                        <select id="select1" className="border-none rounded py-[.5rem] bg-[#F5F6FA]">
                            <option value="option1">عبدالله بن أحمد</option>
                        </select>

                        <label htmlFor="select2" className='text-[18px] text-black font-[500]'>نوع الدفع:</label>
                        <select id="select2" className="border-none rounded  py-[.5rem] bg-[#F5F6FA]">
                            {Payments.map((Payment, index) => (

                                <option value={Payment.NameAr} key={index}>{Payment.NameAr}</option>
                            ))}

                        </select>

                        <label htmlFor="select3" className='text-[18px] text-black font-[500]'>اسم المندوب:</label>
                        <select id="select3" className="border-none rounded  py-[.5rem] bg-[#F5F6FA]">
                            {Delegates.map((Delegate, index) => (
                                <option value={Delegate.NameAr} key={index}> {Delegate.NameAr}</option>
                            ))}

                        </select>

                        <label htmlFor="select4" className='text-[18px] text-black font-[500]'>نوع الصندوق:</label>
                        <select id="select4" className="border-none rounded  py-[.5rem] bg-[#F5F6FA]">
                            {Boxs.map((Box, i) => (
                                <option value={Box.NameAr} key={i}>{Box.NameAr}</option>
                            ))}
                        </select>

                        <label htmlFor="select5" className='text-[18px] text-black font-[500]'>الملاحظات:</label>
                        <select id="select5" className="border-none rounded  py-[.5rem] bg-[#F5F6FA]">
                            <option value="option1">لا يوجد</option>
                        </select>
                    </div>

                    {/* Second Line */}
                    <div className=" flex items-center space-x-4 mt-4  justify-end rounded-[30px] p-[10px 14px]">

                        <div className="relative">
                            <button className="absolute bg-[#D8951D] rounded-3xl text-white w-[119px] h-[43px] px-6 py-2"
                                onClick={() => getSearchResult(SearchInput)}>بحث</button>
                            <img src={Search} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-auto" alt="Search Icon" />
                            <input
                                type="text"
                                className="pl-[8.5rem] border bg-[#F5F6FA] text-right rounded-3xl text-[#0000004D] pr-10 py-2 w-[456px]"
                                placeholder="البحث باسم المنتج"
                                value={SearchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <button className="absolute bg-[#D8951D] rounded-3xl items-center text-white w-[119px] h-[43px] pl-12 pr-10 py-2" onClick={toggleDropdown}>
                                <img src={barcode} className="h-4 w-6" alt="Search Icon" />
                            </button>
                            <img src={barcode} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-6" alt="Search Icon" />
                            <input
                                type="text"
                                value={barcodeInput}
                                onChange={(e) => setBarcodeInput(e.target.value)}
                                className="pl-[8.5rem] border bg-[#F5F6FA] text-right rounded-3xl text-[#0000004D] pr-10 py-2 w-[456px]"
                                placeholder="البحث بالباركود"
                            />
                            {showDropdown && (
                                <div className="absolute top-12 right-[8px] font-medium shadow-lg bg-[#F5F6FA] p-3 w-[61%] flex-wrap border border-gray-300 rounded">
                                    {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
                                        <button key={num} className="py-[11px] px-[20px] m-[1rem] rounded-full bg-white" onClick={() => handleButtonClick(num)}>
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Third Line */}
                    <div className="flex items-center space-x-4 mt-4 justify-between  rounded-[30px] p-[10px 14px]">

                        <button className="w-[18%] bg-[#D8951D] rounded-lg text-white h-[43px] px-0 py-2">إجمالي الفاتورة : {totalPrice} د.ع</button>

                        <div className="justify-around w-[80%] flex">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0.25, 0.50, 0.75].map((value, index) => (
                                <button key={index} className="bg-[#F5F6FA] text-[#000000] text-[16px] font-medium px-[1rem] py-2 rounded" onClick={() => handleUnitConvertChange(clickedRow, value)}>
                                    {value}
                                </button>
                            ))}
                            <button className="bg-[#F5F6FA] text-[#000000] text-[20px] font-medium px-[1rem] py-1 rounded"
                                onClick={() => {
                                    const updatedProducts = [...Products];
                                    if (updatedProducts[clickedRow].UnitConvert > 1) {
                                        updatedProducts[clickedRow].UnitConvert -= 1;
                                        setProducts(updatedProducts);
                                    }
                                }}>
                                -
                            </button>
                            <button
                                className="bg-[#F5F6FA] text-[#000000] text-[20px] font-medium px-3 py-1 rounded"
                                onClick={() => {
                                    const updatedProducts = [...Products];
                                    updatedProducts[clickedRow].UnitConvert += 1;
                                    setProducts(updatedProducts);
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side with image */}
                <div className="flex items-center w-[10%]">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-38 w-38 object-cover"
                    />
                </div>
            </header >

            <div className="flex justify-between ">
                {/* Left Side */}
                <div className="flex w-[90%] bg-[#F5F6FA]">
                    {/* Left Side - LEFT Section */}
                    <div className="flex flex-col w-[70%]">

                        {/* Product details table */}
                        <div style={{ paddingTop: '30px', paddingLeft: "20px", }}>
                            <div style={{ borderRadius: "8px", overflow: "scroll", height: "29vh" }} >
                                <table className="bg-[#ffffff] " style={{ width: '100%', borderCollapse: 'collapse', }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#D9D9D9" }}>
                                            <th style={tableCellStyle}> </th>
                                            <th style={tableCellStyle}>اجمالي التكلفة</th>
                                            <th style={tableCellStyle}>الكمية</th>
                                            <th style={tableCellStyle}>السعر</th>
                                            <th style={tableCellStyle}>المنتج</th>
                                            <th style={tableCellStyle}> الترتيب </th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {Products.map((Product, index) => (

                                            <tr className="bg-[#ffffff] " key={index} onClick={() => handleRowClick(index)}
                                                style={{ backgroundColor: clickedRow === index ? 'aliceblue' : '' }}>
                                                <td style={tableCellStyle}>
                                                    <img src={Button} style={{ margin: "auto" }} onClick={() => handleDeleteFromTable(index)} />
                                                </td>
                                                <td style={tableCellStyle}>د.ع {Product.SalesPrice * Product.UnitConvert}</td>
                                                <td style={tableCellStyle}>{Product.UnitConvert}</td>
                                                <td style={tableCellStyle}>د.ع {parseInt(Product.SalesPrice)}</td>
                                                <td style={tableCellStyle}>{Product.NameAr}</td>
                                                <td style={tableCellStyle}>{index + 1}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-between mt-[20px] pl-[30px]">
                            <div className="flex flex-col w-[20%] text-[12px] ">
                                <button className="bg-[#ffff] text-right rounded-lg text-[#717171] h-[43px] mb-2 px-1">الإجمالي : &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalPrice}</button>
                                <button className="relative bg-[#ffff] text-right rounded-lg text-[#717171] h-[43px] px-1 mb-2  py-2 "> : المدفوع
                                    <input
                                        type="number"
                                        className="bg-[#ffff] border-none left-[0px] top-0 text-center rounded-lg text-[#717171] h-[43px] w-[7rem] mb-2 pl-[2.8rem] py-2 absolute"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                </button>
                                <button className=" bg-[#ffff] text-right rounded-lg text-[#717171] h-[43px] px-1 mb-2  py-2"> الباقي :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{theRest}</button>
                            </div>
                            <div className="flex w-[80%] justify-end">
                                <button className="w-[17%] bg-[#EA4335] rounded-lg text-white h-[43px] px-4 py-2"
                                    onClick={() => handleDeleteFromTable(clickedRow)}>حذف</button>
                                <button className="w-[17%] bg-[#D8951D] rounded-lg text-white h-[43px] px-4 ml-3 py-2"
                                    onClick={() => handleResetClick()}>جديد</button>
                                <button className="w-[17%] bg-[#D8951D] rounded-lg text-white h-[43px] px-4 ml-3 py-2">حفظ</button>

                            </div>



                        </div>

                    </div>

                    {/* Left Side - RIGHT Section */}
                    <div className="flex-1 grid grid-cols-2 py-[30px] px-[20px] mb-[1rem] gap-4 w-[30%] h-[69vh] overflow-scroll">

                        {/* First Column */}
                        <div className="w-[150px] ">
                            {Items.slice(0, Math.ceil(Items.length / 2)).map((item, index) => (

                                <div className="bg-white p-2 mb-[20px] rounded-lg" key={index}
                                    onClick={() => handleProductClick(item)}>
                                    <img src={Shoe1} alt="Image" className="w-full h-auto rounded-md" />
                                    <div className="mt-2 text-end">
                                        <h4 className="text-lg font-semibold truncate"
                                            style={{ whiteSpace: "normal", maxHeight: '2.4em', lineHeight: '1.2em' }}>{item.NameAr} </h4>
                                        <h4 className="text-lg font-semibold ">{parseInt(item.SalesPrice)} د.ع</h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Second Column */}
                        <div className="w-[150px] ">
                            {Items.slice(Math.ceil(Items.length / 2)).map((item, index) => (
                                // Adjust index to reflect actual position in the array
                                <div className="bg-white p-2 mb-[20px] rounded-lg" key={index + Math.ceil(Items.length / 2)}
                                    onClick={() => handleProductClick(item)}>
                                    <img src={Shoe1} alt="Image" className="w-full h-auto rounded-md" />
                                    <div className="mt-2 text-end">
                                        <h4 className="text-lg font-semibold truncate"
                                            style={{ whiteSpace: "normal", maxHeight: '2.4em', lineHeight: '1.2em' }}>{item.NameAr} </h4>
                                        <h4 className="text-lg font-semibold"> د.ع {parseInt(item.SalesPrice)} </h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

                {/* Right Side */}
                <div className="flex flex-col w-[10%] mt-[8px!important] h-[69vh] overflow-scroll">
                    {/* Right Side - Column of Buttons */}
                    {Groups.map((Group, index) => (
                        <div className="flex flex-col p-4 pb-0 mx-auto" key={index}>
                            <button className={`my-2 text-[10px] font-medium p-[2px]  w-[58px] alian-center rounded-xl
                            ${selectedGroup && selectedGroup.ID === Group.ID ? 'bg-[#F5F6FA]' : 'bg-white'} `}
                                onClick={() => handleGroupClick(Group)}>
                                <img src={grpimg} className='m-auto' />
                                {Group.NameAr}
                            </button>
                        </div>
                    ))}
                </div>
            </div>






        </>
    );
}

export default Home;