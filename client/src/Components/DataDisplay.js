import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";


function DataGridComponent() {
  const [data,setdata] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'email', headerName: 'Email', width: 70 },
    { field: 'class', headerName: 'Class', width: 70 },
    { field: 'courses', headerName: 'Courses', width: 70 },
    { field: 'stateOfClass', headerName: 'StateOfClass', width: 120 },
    { field: 'courseContents', headerName: 'CourseContents', width: 120 },
    { field: 'audioConnectivity', headerName: 'AudioConnectivity', width: 120 },
    { field: 'lectureStructure', headerName: 'LectureStructure', width: 120 },
    { field: 'learningMaterials', headerName: 'LearningMaterials', width: 120 },
    { field: 'Datetime', headerName: 'Datetime', width: 70 },
    { field: 'currentCourseTopic', headerName: 'CurrentCourseTopic', width: 70 },
    { field: 'comments', headerName: 'Comments', width: 70 }
  ];

  const getData = async () => {
    try {
      const url = 'http://localhost:8080/';
      const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const dataResponse = await response.json();
      // let id = 'id';

      var sampledata =[];
      dataResponse.map((row,index)=>{
        sampledata.push({...row, id:index+1});
        // console.log(row)
      })
      setdata(sampledata);
    } catch (error) {
      console.log("Error in fetch :" + error);
    }

  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={5} />
    </div>
  );
}

export default DataGridComponent;
