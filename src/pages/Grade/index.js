import React, { useState, useEffect } from 'react';
import NavComponents from "../../components/NavComponents";
import Footer from "../../components/Footer";
import axios from "axios";

const Grade = () => {
    const units = ['unit1', 'unit2', 'unit3']; 

    const [selectedUnit, setSelectedUnit] = useState(units[0]); // 預設選擇第一個單元
    const [gradesData, setGradesData] = useState({});
    

    const handleUnitChange = (event) => {
        setSelectedUnit(event.target.value);
    };
    
    async function getGrade() {
        var id = localStorage.getItem("id");
        console.log("hello", id);
        id = String(id)

        var formData = new FormData();
        formData.append('user_id', id)
        formData.append("unit", selectedUnit)

        try {
            const response = await axios.post(
                "http://localhost:5000/grade",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            setGradesData(response.data);
        } catch (error) {
            console.error('獲取成績資料時發生錯誤：', error);
        }
    }


    useEffect(() => {
       getGrade()
    }, [selectedUnit]);

    const totalScore = gradesData.grade || 0;
    const studentGrades = gradesData.table || [];

    return (
        <>
            <NavComponents needIcon={true} />
            <div className="min-h-[85vh] flex justify-center items-center mx-auto text-xl" >
             {''}
             <div className='block leading-8'>
                <label className="block mt-4">
                <span className="text-lg font-semibold">選擇單元：</span>
                <select
                   value={selectedUnit}
                   onChange={handleUnitChange}
                   className="mt-1 block w-full p-2  text-center rounded-md border-gray-950 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                   {units.map((unit) => (
                    <option key={unit} value={unit}>
                           {unit}
                 </option>
                         ))}
                     </select>
                    </label>

                <h3>{selectedUnit} 的成績如下：</h3>
               
                {studentGrades.length > 0 ? (
                    <table className="border border-gray-300">
                        <thead>
                            <tr className="border border-gray-300 px-4 py-2">
                                <th className="border border-gray-300 px-4 py-2">單字</th>
                                <th className="border border-gray-300 px-4 py-2">成績</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentGrades.map(({ word, grade }) => (
                                <tr key={word} className="bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{word}</td>
                                    <td className="border border-gray-300 px-4 py-2">{grade > 80 ? 10 : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>該單元沒有成績資料。</p>
                )}
               

               {studentGrades.length > 0 && selectedUnit === 'unit1' && (
                 <h3 className='p-4 mr-8 text-2xl'>單元一共10題答對 {totalScore/10} 題</h3>
                )}

                {studentGrades.length > 0 && selectedUnit === 'unit2' && (
                 <h3 className='p-4 mr-8 text-2xl'>單元二共9題答對 {totalScore/10} 題</h3>
                )}

                {studentGrades.length > 0 && selectedUnit === 'unit3' && (
                 <h3 className='p-4 mr-8 text-2xl'>單元三共10題答對 {totalScore/10} 題</h3>
                )}

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Grade;





