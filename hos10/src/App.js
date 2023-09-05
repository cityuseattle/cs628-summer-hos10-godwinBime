import React from "react";
import {Route, Routes} from "react-router-dom";

import RecordList from "./frontend/components/recordList";
import Edit from "./frontend/components/edit";
import Create from "./frontend/components/create";
import Login from "./frontend/components/login";


const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
 };

export default App;
