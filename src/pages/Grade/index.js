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

    const selectedUnitWordsAndGrades = selectedUnit in gradesData ? Object.entries(gradesData[selectedUnit]) : [];
    const totalScore = selectedUnitWordsAndGrades.reduce((acc, [, grade]) => acc + (grade || 0), 0);

    return (
        <>
            <NavComponents needIcon={true} />
            <div>
                <h2>查看成績</h2>
                <label>
                    選擇單元：
                    <select value={selectedUnit} onChange={handleUnitChange}>
                        {units.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </label>
                <h3>{selectedUnit} 的成績如下：</h3>
                {selectedUnitWordsAndGrades ? (
                    <ul>
                        {selectedUnitWordsAndGrades.map(({ word, grade }) => (
                            <li key={word}>
                                單字：{word}  成績：{grade}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>該單元沒有成績資料。</p>
                )}
                 {selectedUnitWordsAndGrades.length > 0 && (
                    <div>
                        <h3>{selectedUnit} 的總分為：{totalScore}</h3>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Grade;
