import React, { useState, useEffect } from 'react';
import NavComponents from "../../components/NavComponents";
import Footer from "../../components/Footer";


const Grade = () => {
    const units = ['單元一', '單元二', '單元三']; //查詢應該會改成123比較好查

    const [selectedUnit, setSelectedUnit] = useState(units[0]); // 預設選擇第一個單元
    const [gradesData, setGradesData] = useState({});
    

    const handleUnitChange = (event) => {
        setSelectedUnit(event.target.value);
    };

    useEffect(() => {
        // 在這裡發送API請求來獲取成績資料，假設後端提供了一個獲取成績資料的API端點：/api/grades
        fetch(`/api/grades?unit=${selectedUnit}`)
            .then((response) => response.json())
            .then((data) => {
                // 假設資料回傳的格式為 { word: grade } 的物件
                setGradesData(data);
            })
            .catch((error) => {
                console.error('獲取成績資料時發生錯誤：', error);
            });
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
