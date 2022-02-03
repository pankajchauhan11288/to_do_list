import React, { useState,useEffect} from "react";
import logo from '../logo.svg';
const GetLocalData = ()=>{
    const lists = localStorage.getItem("MyToDoList");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}
const Todolist = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(GetLocalData());
  const AddItem = () => {
    if (inputData) {
      setItems([...items, inputData]);
      setInputData("");
    }
  };
  const DeleteItem = (id)=>{
    const updatedItems = items.filter((elm, ind)=>{
        return ind!==id
    })
    setItems(updatedItems);
  }
  const RemoveAll = ()=>{
    setItems([]);
  }
  useEffect(()=>{
    localStorage.setItem("MyToDoList",JSON.stringify(items));
  },[items]);
  return (
    <>
      <div className="container-fluid">
        <div className="jumbotron text-center">
            <div className="container">
          <figure className="bg-warning">
            <img className="bg-warning" src={logo} alt="..." width={"100px"} height="100px" />
            <figcaption className="bg-info text-white">Add your list hear</figcaption>
          </figure>

          <div className="card p-2">
            <input
            className="form-control"
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <i className="fa fa-plus btn btn-success" title="Add item" onClick={AddItem}></i>
          </div>

          <div className="card p-2">
            {items.map((elm, ind) => {
              return (
                <div key={ind} className="bg-info">
                  <h5 className="bg-dark text-light">{elm}</h5>
                  <i className="far fa-trash-alt btn btn-warning" title="Delete item" onClick={()=>DeleteItem(ind)}></i>
                </div>
              );
            })}
          </div>

          <div className="card p-3">
            <button className="btn btn-danger" data-sm-link-text="Remove All" onClick={RemoveAll}>
              CHECK LIST
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
